import Web3 from 'web3';
import { keccak_256 as sha3 } from 'js-sha3';
import RNS from '@rsksmart/rns';
import { hash as namehash } from 'eth-ens-namehash';

import {
  rskOwner as rskOwnerAddress,
  rif as rifAddress,
  renewer as renewerAddress,
  registrar as tokenRegistrarAddress,
  partner as partnerAddress,
} from '../../../adapters/configAdapter';
import {
  rskOwnerAbi, tokenRegistrarAbi, deedAbi,
} from './abis.json';
import { rifAbi } from '../../registrar/abis.json';
import { gasPrice as defaultGasPrice } from '../../../adapters/gasPriceAdapter';
import { getOptions } from '../../../adapters/RNSLibAdapter';

import { getRenewData } from './helpers';
import transactionListener from '../../../helpers/transactionListener';

import {
  requestTransferDomain, receiveTransferDomain, errorTransferDomain,
  requestDomainExpirationTime, receiveDomainExpirationTime,
  errorDomainExpirationTime, requestRenewDomain, receiveRenewDomain, errorRenewDomain,
  requestFifsMigration, receiveFifsMigration, errorFifsMigration, requestSetRegistryOwner,
  errorSetRegistryOwner, receiveSetRegistryOwner, requestReclaimDomain, errorReclaimDomain,
  receiveReclaimDomain,
} from './actions';

import { receiveRegistryOwner } from '../actions';
import { resolveDomain } from '../../resolve/operations';
import { NOT_ENOUGH_RIF } from './types';

export const checkIfSubdomainAndGetExpirationRemaining = name => (dispatch) => {
  dispatch(requestDomainExpirationTime());

  const label = name.split('.')[0];
  const hash = `0x${sha3(label)}`;

  const web3 = new Web3(window.rLogin);
  const rskOwner = new web3.eth.Contract(
    rskOwnerAbi, rskOwnerAddress, { gasPrice: defaultGasPrice },
  );

  rskOwner.methods.expirationTime(hash).call((error, result) => {
    if (error) {
      dispatch(errorDomainExpirationTime());
      return;
    }

    const expirationTime = result;

    web3.eth.getBlock('latest').then((currentBlock, timeError) => {
      if (timeError) {
        return dispatch(errorDomainExpirationTime());
      }

      // the difference is in seconds, so it is divided by the amount of seconds per day
      const getRemainingDays = exp => Math.floor((exp - currentBlock.timestamp) / (60 * 60 * 24));

      const remainingDays = getRemainingDays(expirationTime);

      if (remainingDays > 0) {
        return dispatch(receiveDomainExpirationTime(remainingDays));
      }

      // this means he logged in but the expiration time was not found
      // in the rsk owner => it is in the auction regisrar
      const auctionRegistrar = new web3.eth.Contract(
        tokenRegistrarAbi,
        tokenRegistrarAddress,
      );

      return auctionRegistrar.methods.entries(hash).call()
        .then((entries) => {
          const deed = new web3.eth.Contract(deedAbi, entries[1]);
          return deed.methods.expirationDate().call();
        })
        .then((deedExpirationTime) => {
          const remaining = getRemainingDays(deedExpirationTime);
          dispatch(receiveDomainExpirationTime(remaining));
        });
    });
  });
};

export const renewDomain = (domain, rifCost, duration) => async (dispatch) => {
  dispatch(requestRenewDomain());

  const web3 = new Web3(window.rLogin);
  const durationBN = new web3.utils.BN(duration);

  const weiValue = rifCost * (10 ** 18);
  const accounts = await window.rLogin.request({ method: 'eth_accounts' });
  const currentAddress = accounts[0];

  const data = getRenewData(domain, durationBN, partnerAddress);

  const rif = new web3.eth.Contract(
    rifAbi, rifAddress, { from: currentAddress, gasPrice: defaultGasPrice },
  );

  rif.methods.balanceOf(accounts[0]).call((balanceError, balance) => {
    if (balance / (10 ** 18) < rifCost) {
      return dispatch(errorRenewDomain(NOT_ENOUGH_RIF));
    }

    return rif
      .methods
      .transferAndCall(renewerAddress, weiValue.toString(), data)
      .send((error, result) => {
        if (error) {
          return dispatch(errorRenewDomain(error.message));
        }

        const transactionConfirmed = listenerParams => (listenerDispatch) => {
          listenerDispatch(receiveRenewDomain(listenerParams.resultTx));
          listenerDispatch(checkIfSubdomainAndGetExpirationRemaining(`${listenerParams.domain}.rsk`));
        };

        return dispatch(transactionListener(
          result,
          transactionConfirmed,
          { domain },
          listenerParams => listenerDispatch => listenerDispatch(
            errorRenewDomain(listenerParams.errorReason),
          ),
        ));
      });
  });
};

export const transferDomain = (name, address, sender) => async (dispatch) => {
  dispatch(requestTransferDomain());

  // get address if it ends with .rsk
  const addressToTransfer = await address.endsWith('.rsk')
    ? await dispatch(resolveDomain(address, null, errorTransferDomain, sender)) : address;

  if (!addressToTransfer) {
    return false;
  }

  const label = name.split('.')[0];

  return new Promise((resolve) => {
    const hash = `0x${sha3(label)}`;

    const web3 = new Web3(window.rLogin);
    const rskOwner = new web3.eth.Contract(
      rskOwnerAbi, rskOwnerAddress, { gasPrice: defaultGasPrice },
    );

    rskOwner.methods.transferFrom(sender, addressToTransfer, hash).send(
      { from: sender },
      (error, result) => {
        if (error) {
          return resolve(dispatch(errorTransferDomain(error.message)));
        }

        return dispatch(transactionListener(
          result,
          listenerParams => listenerDispatch => listenerDispatch(
            receiveTransferDomain(listenerParams.resultTx),
          ),
          {},
          listenerParams => listenerDispatch => listenerDispatch(
            errorTransferDomain(listenerParams.errorReason),
          ),
        ));
      },
    );
  });
};

export const migrateToFifsRegistrar = (domain, address) => (dispatch) => {
  dispatch(requestFifsMigration());

  return new Promise((resolve) => {
    const label = `0x${sha3(domain.split('.')[0])}`;
    const web3 = new Web3(window.rLogin);

    const tokenRegistrar = new web3.eth.Contract(
      tokenRegistrarAbi, tokenRegistrarAddress, { gasPrice: defaultGasPrice },
    );

    tokenRegistrar.methods.transferRegistrars(label).send(
      { from: address },
      (error, result) => {
        if (error) {
          return dispatch(errorFifsMigration());
        }

        return dispatch(transactionListener(
          result,
          // eslint-disable-next-line no-unused-vars
          _listenerParams => listenerDispatch => listenerDispatch(resolve(receiveFifsMigration())),
          {},
          listenerParams => listenerDispatch => listenerDispatch(
            errorFifsMigration(listenerParams.errorReason),
          ),
        ));
      },
    );
  });
};

/**
 * Set RNS Registry owner to a different address, aka "Set Controller"
 * @param {string} domain that should be set
 * @param {address} address new address to set owner to
 */
export const setRegistryOwner = (domain, address, currentValue) => async (dispatch) => {
  dispatch(requestSetRegistryOwner(domain));

  // get address if it ends with .rsk
  const newAddress = await address.endsWith('.rsk')
    ? await dispatch(resolveDomain(address, null, errorSetRegistryOwner, currentValue)) : address;

  if (!newAddress) {
    return false;
  }

  const label = namehash(domain);
  const accounts = await window.rLogin.request({ method: 'eth_accounts' });
  const currentAddress = accounts[0].toLowerCase();

  const web3 = new Web3(window.rLogin);
  const rns = new RNS(web3, getOptions());
  await rns.compose();
  return rns.contracts.registry.methods.setOwner(label, newAddress)
    .send({ from: currentAddress }, (error, result) => {
      if (error) {
        return dispatch(errorSetRegistryOwner(error.message));
      }

      const transactionConfirmed = listenerParams => (listenerDispatch) => {
        const listenerAddress = listenerParams.newAddress;
        listenerDispatch(receiveRegistryOwner(
          listenerAddress,
          listenerAddress.toLowerCase() === listenerParams.currentAddress.toLowerCase(),
        ));

        listenerDispatch(receiveSetRegistryOwner(newAddress, listenerParams.resultTx));
        listenerDispatch(receiveRegistryOwner(newAddress, false));
      };

      return dispatch(transactionListener(
        result,
        transactionConfirmed,
        { newAddress, currentAddress },
        listenerParams => listenerDispatch => listenerDispatch(
          errorSetRegistryOwner(listenerParams.errorReason),
        ),
        {},
      ));
    });
};

/**
 * Reclaim the domain from the RNS registry if you are the token holder
 * @param {string} domain to be reclaimed
 */
export const reclaimDomain = domain => async (dispatch) => {
  dispatch(requestReclaimDomain(domain));

  const label = `0x${sha3(domain.split('.')[0])}`;
  const accounts = await window.rLogin.request({ method: 'eth_accounts' });
  const currentAddress = accounts[0].toLowerCase();
  const web3 = new Web3(window.rLogin);
  const rskOwner = new web3.eth.Contract(
    rskOwnerAbi, rskOwnerAddress, { gasPrice: defaultGasPrice },
  );

  rskOwner.methods.reclaim(label, currentAddress)
    .send({ from: currentAddress }, (error, result) => {
      if (error) {
        return dispatch(errorReclaimDomain(error.message));
      }

      const transactionConfirmed = listenerParams => (listenerDispatch) => {
        listenerDispatch(receiveRegistryOwner(listenerParams.currentAddress, true));
        listenerDispatch(receiveReclaimDomain(listenerParams.resultTx));
      };

      return dispatch(transactionListener(
        result,
        transactionConfirmed,
        { currentAddress },
        listenerParams => listenerDispatch => listenerDispatch(
          errorReclaimDomain(listenerParams.errorReason),
        ),
      ));
    });
};
