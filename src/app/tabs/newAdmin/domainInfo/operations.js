import Web3 from 'web3';
import { keccak_256 as sha3 } from 'js-sha3';
import RNS from '@rsksmart/rns';
import { hash as namehash } from 'eth-ens-namehash';

import {
  rskOwner as rskOwnerAddress,
  rif as rifAddress,
  renewer as renewerAddress,
  registrar as tokenRegistrarAddress,
} from '../../../adapters/configAdapter';
import {
  rskOwnerAbi, rifAbi, tokenRegistrarAbi,
} from './abis.json';
import { gasPrice as defaultGasPrice } from '../../../adapters/gasPriceAdapter';
import { getOptions } from '../../../adapters/RNSLibAdapter';

import { getRenewData } from '../../renew/helpers';
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

const web3 = new Web3(window.ethereum);
const rns = new RNS(web3, getOptions());

const rskOwner = new web3.eth.Contract(
  rskOwnerAbi, rskOwnerAddress, { gasPrice: defaultGasPrice },
);

export const checkIfSubdomainAndGetExpirationRemaining = name => (dispatch) => {
  dispatch(requestDomainExpirationTime());

  const label = name.split('.')[0];
  const hash = `0x${sha3(label)}`;

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

      const diff = expirationTime - currentBlock.timestamp;

      // the difference is in seconds, so it is divided by the amount of seconds per day
      const remainingDays = Math.floor(diff / (60 * 60 * 24));

      return dispatch(receiveDomainExpirationTime(remainingDays));
    });
  });
};

const renewDomainComplete = (result, domain) => (dispatch) => {
  dispatch(receiveRenewDomain(result));
  dispatch(checkIfSubdomainAndGetExpirationRemaining(`${domain}.rsk`));
};

export const renewDomain = (domain, rifCost, duration) => async (dispatch) => {
  dispatch(requestRenewDomain());

  const durationBN = window.web3.toBigNumber(duration);
  const weiValue = rifCost * (10 ** 18);
  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];

  const data = getRenewData(domain, durationBN);

  const rif = new web3.eth.Contract(
    rifAbi, rifAddress, { from: currentAddress, gasPrice: defaultGasPrice },
  );

  return rif
    .methods
    .transferAndCall(renewerAddress, weiValue.toString(), data)
    .send((error, result) => {
      if (error) {
        return dispatch(errorRenewDomain(error.message));
      }

      return transactionListener(
        result,
        () => dispatch(renewDomainComplete(result, domain)),
        errorReason => dispatch(errorRenewDomain(errorReason)),
      );
    });
};

export const transferDomainConfirmed = tx => (dispatch) => {
  dispatch(receiveTransferDomain(tx));
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

    rskOwner.methods.transferFrom(sender, addressToTransfer, hash).send(
      { from: sender },
      (error, result) => {
        if (error) {
          return resolve(dispatch(errorTransferDomain(error.message)));
        }

        return transactionListener(
          result,
          () => dispatch(transferDomainConfirmed(result)),
          errorReason => dispatch(errorTransferDomain(errorReason)),
        );
      },
    );
  });
};

export const migrateToFifsRegistrar = (domain, address) => (dispatch) => {
  dispatch(requestFifsMigration());

  return new Promise((resolve) => {
    const label = `0x${sha3(domain.split('.')[0])}`;

    const tokenRegistrar = new web3.eth.Contract(
      tokenRegistrarAbi, tokenRegistrarAddress, { gasPrice: defaultGasPrice },
    );

    tokenRegistrar.methods.transferRegistrars(label).send(
      { from: address },
      (error, result) => {
        if (error) {
          return dispatch(errorFifsMigration());
        }

        return transactionListener(
          result,
          () => resolve(dispatch(receiveFifsMigration())),
          () => resolve(dispatch(errorFifsMigration())),
        );
      },
    );
  });
};

/**
 * Set RNS Registry owner to a different address
 * aka "Set Controller" in the UI
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
  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0].toLowerCase();

  await rns.compose();
  return rns.contracts.registry.methods.setOwner(label, newAddress)
    .send({ from: currentAddress }, (error, result) => {
      if (error) {
        return dispatch(errorSetRegistryOwner(error.message));
      }

      const transactionConfirmed = () => {
        dispatch(receiveRegistryOwner(
          newAddress, newAddress.toLowerCase() === currentAddress.toLowerCase(),
        ));

        dispatch(receiveSetRegistryOwner(newAddress, result));
        dispatch(receiveRegistryOwner(newAddress, false));
      };

      return transactionListener(
        result,
        () => transactionConfirmed(),
        errorReason => dispatch(errorSetRegistryOwner(errorReason)),
      );
    });
};

/**
 * Reclaim the domain from the RNS registry if you are the token holder
 * @param {string} domain to be reclaimed
 */
export const reclaimDomain = domain => async (dispatch) => {
  dispatch(requestReclaimDomain(domain));

  const label = `0x${sha3(domain.split('.')[0])}`;
  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0].toLowerCase();

  rskOwner.methods.reclaim(label, currentAddress)
    .send({ from: currentAddress }, (error, result) => {
      if (error) {
        return dispatch(errorReclaimDomain(error.message));
      }

      const transactionConfirmed = () => {
        dispatch(receiveRegistryOwner(currentAddress, true));
        dispatch(receiveReclaimDomain(result));
      };

      return transactionListener(
        result,
        () => transactionConfirmed(),
        errorReason => dispatch(errorReclaimDomain(errorReason)),
      );
    });
};
