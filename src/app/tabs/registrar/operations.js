import { keccak_256 as sha3 } from 'js-sha3';
import {
  requestGetCost, receiveGetCost,
  requestCommitRegistrar, receiveCommitRegistrar, errorRegistrarCommit,
  requestRevealCommit, receiveRevealCommit, receiveCanRevealCommit,
  errorRevealCommit,
} from './actions';
import {
  fifsRegistrar as fifsRegistrarAddress,
  rif as rifAddress,
} from '../../../config/contracts';
import { notifyError, notifyTx, txTypes } from '../../notifications';
import { fifsRegistrarAbi, rifAbi } from './abis.json';
import { getRegisterData } from './helpers';

export const getCost = (domain, duration) => (dispatch) => {
  const registrar = window.web3.eth.contract(fifsRegistrarAbi).at(fifsRegistrarAddress);

  dispatch(requestGetCost(duration));

  return new Promise((resolve) => {
    registrar.price(domain, 0, duration, (error, result) => {
      if (error) return resolve(dispatch(notifyError(error.message)));

      return dispatch(receiveGetCost(window.web3.toDecimal(result / (10 ** 18))));
    });
  });
};

export const checkIfAlreadyCommitted = domain => async (dispatch) => {
  const salt = localStorage.getItem(`${domain}-salt`);

  if (!salt) return null;

  dispatch(requestCommitRegistrar());

  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];

  const registrar = window.web3.eth.contract(fifsRegistrarAbi).at(fifsRegistrarAddress);
  return new Promise((resolve) => {
    registrar.makeCommitment(`0x${sha3(domain)}`, currentAddress, salt, (error, hashCommit) => {
      if (error) return resolve(dispatch(notifyError(error.message)));
      return resolve(dispatch(receiveCommitRegistrar(hashCommit)));
    });
  });
};

export const commit = domain => async (dispatch) => {
  dispatch(requestCommitRegistrar());

  const randomBytes = window.crypto.getRandomValues(new Uint8Array(32));
  const salt = `0x${Array.from(randomBytes).map(byte => byte.toString(16)).join('')}`;

  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];

  const registrar = window.web3.eth.contract(fifsRegistrarAbi).at(fifsRegistrarAddress);

  return new Promise((resolve) => {
    registrar.makeCommitment(`0x${sha3(domain)}`, currentAddress, salt, (error, hashCommit) => {
      if (error) return resolve(dispatch(notifyError(error.message)));

      return registrar.commit(hashCommit, (_error, result) => {
        if (_error) {
          dispatch(errorRegistrarCommit());
          return resolve(dispatch(notifyError(_error.message)));
        }

        localStorage.setItem(`${domain}-salt`, salt);
        dispatch(receiveCommitRegistrar(hashCommit));
        return resolve(dispatch(notifyTx(result, '', { type: txTypes.REGISTRAR_COMMIT })));
      });
    });
  });
};

export const checkCanReveal = hash => async (dispatch) => {
  const registrar = window.web3.eth.contract(fifsRegistrarAbi).at(fifsRegistrarAddress);

  return new Promise((resolve) => {
    registrar.canReveal(hash, (error, canReveal) => {
      if (error) return resolve(dispatch(notifyError(error.message)));

      return dispatch(receiveCanRevealCommit(canReveal));
    });
  });
};

export const revealCommit = (domain, tokens, duration) => async (dispatch) => {
  dispatch(requestRevealCommit());

  const weiValue = tokens * (10 ** 18);
  const weiBN = window.web3.toBigNumber(weiValue);
  const salt = localStorage.getItem(`${domain}-salt`);
  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];
  const durationBN = window.web3.toBigNumber(duration);

  const data = getRegisterData(domain, currentAddress, salt, durationBN);

  const rif = window.web3.eth.contract(rifAbi).at(rifAddress);

  return new Promise((resolve) => {
    rif.transferAndCall(fifsRegistrarAddress, weiBN, data, (error, result) => {
      if (error) {
        dispatch(errorRevealCommit());
        return resolve(dispatch(notifyError(error.message)));
      }

      dispatch(receiveRevealCommit());
      return resolve(dispatch(notifyTx(result, '', { type: txTypes.REVEAL_COMMIT })));
    });
  });
};
