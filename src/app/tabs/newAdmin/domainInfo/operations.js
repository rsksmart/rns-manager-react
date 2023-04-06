import { keccak_256 as sha3 } from 'js-sha3';
import { BigNumber, ethers } from 'ethers';
import { toWei } from 'web3-utils';
import {
  registrar as tokenRegistrarAddress,
  rif as rifAddress,
  rskOwner as rskOwnerAddress,
} from '../../../adapters/configAdapter';
import { deedAbi, rskOwnerAbi, tokenRegistrarAbi } from './abis.json';
import { rifAbi } from '../../registrar/abis.json';

import {
  errorDomainExpirationTime,
  errorFifsMigration,
  errorReclaimDomain,
  errorRenewDomain,
  errorSetRegistryOwner,
  errorTransferDomain,
  receiveDomainExpirationTime,
  receiveFifsMigration,
  receiveReclaimDomain,
  receiveRenewDomain,
  receiveSetRegistryOwner,
  receiveTransferDomain,
  requestDomainExpirationTime,
  requestFifsMigration,
  requestReclaimDomain,
  requestRenewDomain,
  requestSetRegistryOwner,
  requestTransferDomain,
} from './actions';

import { receiveRegistryOwner } from '../actions';
import { resolveDomain } from '../../resolve/operations';
import { NOT_ENOUGH_RIF } from './types';
import { registrar, rns } from '../../../rns-sdk';
import { TRANSACTION_RECEIPT_FAILED } from '../../../types';
import getSigner from '../../../helpers/getSigner';
import getProvider from '../../../helpers/getProvider';

export const checkIfSubdomainAndGetExpirationRemaining = name => async (dispatch) => {
  dispatch(requestDomainExpirationTime());

  const label = name.split('.')[0];
  const hash = `0x${sha3(label)}`;

  const provider = getProvider();

  const rskOwner = new ethers.Contract(
    rskOwnerAddress, rskOwnerAbi, provider,
  );

  try {
    const expirationTime = await rskOwner.expirationTime(hash);

    const currentBlock = await provider.getBlock('latest');

    // the difference is in seconds, so it is divided by the amount of seconds per day
    const getRemainingDays = exp => Math.floor((exp - currentBlock.timestamp) / (60 * 60 * 24));

    const remainingDays = getRemainingDays(expirationTime);

    if (remainingDays > 0) {
      return dispatch(receiveDomainExpirationTime(remainingDays));
    }

    // this means he logged in but the expiration time was not found
    // in the rsk owner => it is in the auction regisrar
    const auctionRegistrar = new ethers.Contract(
      tokenRegistrarAddress,
      tokenRegistrarAbi,
      provider,
    );

    const entries = await auctionRegistrar.entries(hash);

    const deed = new ethers.Contract(entries[1], deedAbi, provider);
    const deedExpirationTime = await deed.expirationDate();

    const remaining = getRemainingDays(deedExpirationTime);
    return dispatch(receiveDomainExpirationTime(remaining));
  } catch (e) {
    return dispatch(errorDomainExpirationTime());
  }
};

export const renewDomain = (domain, rifCost, duration) => async (dispatch) => {
  try {
    dispatch(requestRenewDomain());

    const durationBN = BigNumber.from(duration);
    const cost = BigNumber.from(toWei(rifCost.toString(), 'ether'));

    const signer = await getSigner();
    const r = await registrar(signer);

    const rif = new ethers.Contract(
      rifAddress, rifAbi, signer,
    );

    const balance = await rif.balanceOf(await signer.getAddress());

    if (balance / (10 ** 18) < rifCost) {
      return dispatch(errorRenewDomain(NOT_ENOUGH_RIF));
    }

    const result = await r.renew(domain, durationBN, cost);

    dispatch(receiveRenewDomain(result));
    dispatch(checkIfSubdomainAndGetExpirationRemaining(`${domain}.rsk`));

    return result;
  } catch (e) {
    return dispatch(errorRenewDomain(e.message));
  }
};

export const transferDomain = (name, address, sender) => async (dispatch) => {
  dispatch(requestTransferDomain());

  // get address if it ends with .rsk
  const addressToTransfer = await address.endsWith('.rsk')
    ? await dispatch(resolveDomain(address, errorTransferDomain, sender)) : address;

  if (!addressToTransfer) {
    return false;
  }

  const label = name.split('.')[0];

  try {
    const signer = await getSigner();
    const r = await registrar(signer);

    const result = await r.transfer(label, addressToTransfer);
    return dispatch(receiveTransferDomain(result));
  } catch (e) {
    return dispatch(errorTransferDomain(TRANSACTION_RECEIPT_FAILED));
  }
};

export const migrateToFifsRegistrar = domain => async (dispatch) => {
  dispatch(requestFifsMigration());

  const label = `0x${sha3(domain.split('.')[0])}`;

  const tokenRegistrar = new ethers.Contract(
    tokenRegistrarAbi, tokenRegistrarAddress, await getSigner(),
  );

  try {
    await (await tokenRegistrar.transferRegistrars(label)).wait();
    return dispatch(receiveFifsMigration());
  } catch (e) {
    return dispatch(errorFifsMigration(e.message));
  }
};

/**
 * Set RNS Registry owner to a different address, aka "Set Controller"
 * @param {string} domain that should be set
 * @param {address} address new address to set owner to
 * @param currentValue
 */
export const setRegistryOwner = (domain, address, currentValue) => async (dispatch) => {
  dispatch(requestSetRegistryOwner(domain));

  // get address if it ends with .rsk
  const newAddress = await address.endsWith('.rsk')
    ? await dispatch(resolveDomain(address, errorSetRegistryOwner, currentValue)) : address;

  if (!newAddress) {
    return false;
  }

  const signer = await getSigner();

  const r = rns(signer);

  try {
    const result = await (await r.setOwner(domain, newAddress)).wait();
    dispatch(receiveRegistryOwner(
      newAddress,
      newAddress.toLowerCase() === signer.address.toLowerCase(),
    ));

    dispatch(receiveSetRegistryOwner(newAddress, result.transactionHash));
    dispatch(receiveRegistryOwner(newAddress, false));

    return result;
  } catch (e) {
    return dispatch(errorSetRegistryOwner(e.message));
  }
};

/**
 * Reclaim the domain from the RNS registry if you are the token holder
 * @param {string} domain to be reclaimed
 */
export const reclaimDomain = domain => async (dispatch) => {
  dispatch(requestReclaimDomain(domain));

  const name = domain.split('.')[0];
  const accounts = await window.rLogin.request({ method: 'eth_accounts' });
  const currentAddress = accounts[0].toLowerCase();

  try {
    const signer = await getSigner();

    const r = await registrar(signer);

    await r.reclaim(name);
    dispatch(receiveRegistryOwner(currentAddress, true));
    return dispatch(receiveReclaimDomain(true));
  } catch (e) {
    return dispatch(errorReclaimDomain(e.message));
  }
};
