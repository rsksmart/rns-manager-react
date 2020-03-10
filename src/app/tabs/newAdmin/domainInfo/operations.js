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
import transactionListener from '../../../helpers/transactionListener';

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
  if (name.split('.').length > 2) {
    dispatch(renewDomainIsSubdomain(true));
  }

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

      return dispatch(transactionListener(result, () => renewDomainComplete(result, domain)));
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
