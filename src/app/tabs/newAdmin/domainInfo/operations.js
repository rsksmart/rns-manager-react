import Web3 from 'web3';
import { keccak_256 as sha3 } from 'js-sha3';

import {
  rskOwner as rskOwnerAddress,
  rif as rifAddress,
  renewer as renewerAddress,
} from '../../../adapters/configAdapter';
import {
  rskOwnerAbi, rifAbi,
} from './abis.json';
import { gasPrice as defaultGasPrice } from '../../../adapters/gasPriceAdapter';
import {
  notifyTx, txTypes,
} from '../../../notifications';

import { getRenewData } from '../../renew/helpers';

import {
  requestTransferDomain, receiveTransferDomain, errorTransferDomain,
  renewDomainIsSubdomain, requestDomainExpirationTime, receiveDomainExpirationTime,
  errorDomainExpirationTime, requestRenewDomain, receiveRenewDomain, errorRenewDomain,
} from './actions';

const web3 = new Web3(window.ethereum);
const rskOwner = new web3.eth.Contract(
  rskOwnerAbi, rskOwnerAddress, { gasPrice: defaultGasPrice },
);

export const checkIfSubdomainAndGetExpirationRemaining = name => (dispatch) => {
  const labelsAmount = name.split('.').length;

  if (labelsAmount > 2) {
    return Promise.resolve(dispatch(renewDomainIsSubdomain(true)));
  }

  const label = name.split('.')[0];

  dispatch(requestDomainExpirationTime());

  return new Promise((resolve) => {
    const hash = `0x${sha3(label)}`;

    rskOwner.methods.expirationTime(hash).call((error, result) => {
      if (error) {
        return dispatch(errorDomainExpirationTime());
      }

      const expirationTime = result;

      return web3.eth.getBlock('latest').then((currentBlock, timeError) => {
        if (timeError) {
          return dispatch(errorDomainExpirationTime());
        }

        const diff = expirationTime - currentBlock.timestamp;

        // the difference is in seconds, so it is divided by the amount of seconds per day
        const remainingDays = Math.floor(diff / (60 * 60 * 24));

        return resolve(dispatch(receiveDomainExpirationTime(remainingDays, label)));
      });
    });
  });
};


export const renewDomain = (domain, rifCost, duration) => async (dispatch) => {
  console.log('renewing!', domain, rifCost, duration);

  dispatch(requestRenewDomain());

  const durationBN = window.web3.toBigNumber(duration);
  const weiValue = rifCost * (10 ** 18);
  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];

  const data = getRenewData(domain, durationBN);
  console.log(data);

  const rif = new web3.eth.Contract(
    rifAbi, rifAddress, { from: currentAddress, gasPrice: defaultGasPrice },
  );

  return rif
    .methods
    .transferAndCall(renewerAddress, weiValue.toString(), data)
    .send((error, result) => {
      if (error) {
        console.log('ERROR!', error);
        return dispatch(errorRenewDomain(error.message));
      }

      return dispatch(receiveRenewDomain(result));
      // return dispatch(notifyTx(result, '', { type: txTypes.RENEW_DOMAIN }));
    });
};

export const transferDomainConfirmed = () => (dispatch) => {
  console.log('TRANSFER HAS BEEN COMPLETE!', dispatch);
  dispatch(receiveTransferDomain());
};

export const transferDomain = (name, addressToTransfer, sender) => (dispatch) => {
  dispatch(requestTransferDomain());

  console.log(name, addressToTransfer, sender);

  const label = name.split('.')[0];

  return new Promise((resolve) => {
    const hash = `0x${sha3(label)}`;

    rskOwner.methods.safeTransferFrom(sender, addressToTransfer, hash).send(
      { from: sender },
      (error, result) => {
        if (error) {
          return resolve(dispatch(errorTransferDomain(error.message)));
        }
        return resolve(dispatch(notifyTx(result, '', { type: txTypes.TRANSFER_DOMAIN_TOKEN }, transferDomainConfirmed)));
      },
    );
  });
};
