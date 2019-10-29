import {
  requestGetCost, receiveGetCost,
  requestCommitRegistrar, receiveCommitRegistrar, errorRegistrarCommit,
  requestRevealCommit, receiveRevealCommit, receiveCanRevealCommit,
} from './actions';
import { fifsRegistrar as fifsRegistrarAddress } from '../../../config/contracts';
import { notifyError, notifyTx, txTypes } from '../../notifications';
import abi from './abi.json';

export const getCost = (domain, duration) => (dispatch) => {
  const registrar = window.web3.eth.contract(abi).at(fifsRegistrarAddress);

  dispatch(requestGetCost(duration));

  return new Promise((resolve) => {
    registrar.getCost(domain, duration, duration, (error, result) => {
      if (error) return resolve(dispatch(notifyError(error.message)));

      return dispatch(receiveGetCost(window.web3.toDecimal(result)));
    });
  });
};

export const commit = domain => async (dispatch) => {
  dispatch(requestCommitRegistrar());

  const randomBytes = window.crypto.getRandomValues(new Uint8Array(32));
  const salt = `0x${Array.from(randomBytes).map(byte => byte.toString(16)).join('')}`;

  localStorage.setItem(`${domain}-salt`, salt);

  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];

  const registrar = window.web3.eth.contract(abi).at(fifsRegistrarAddress);

  return new Promise((resolve) => {
    registrar.makeCommitment(domain, currentAddress, salt, (error, hashCommit) => {
      if (error) return resolve(dispatch(notifyError(error.message)));

      return registrar.commit(hashCommit, (_error, result) => {
        if (_error) {
          dispatch(errorRegistrarCommit());
          return resolve(dispatch(notifyError(_error.message)));
        }

        dispatch(receiveCommitRegistrar(hashCommit));
        return resolve(dispatch(notifyTx(result, '', { type: txTypes.REGISTRAR_COMMIT })));
      });
    });
  });
};

export const checkCanReveal = hash => async (dispatch) => {
  const registrar = window.web3.eth.contract(abi).at(fifsRegistrarAddress);

  return new Promise((resolve) => {
    registrar.canReveal(hash, (error, canReveal) => {
      if (error) return resolve(dispatch(notifyError(error.message)));

      return dispatch(receiveCanRevealCommit(canReveal));
    });
  });
};

export const revealCommit = domain => async (dispatch) => {
  dispatch(requestRevealCommit());

  const randomBytes = window.crypto.getRandomValues(new Uint8Array(32));
  const salt = `0x${Array.from(randomBytes).map(byte => byte.toString(16)).join('')}`;

  localStorage.setItem(`${domain}-salt`, salt);

  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];

  const registrar = window.web3.eth.contract(abi).at(fifsRegistrarAddress);

  return new Promise((resolve) => {
    registrar.makeCommitment(domain, currentAddress, salt, (error, hashCommit) => {
      if (error) return resolve(dispatch(notifyError(error.message)));

      return registrar.commit(hashCommit, (_error, result) => {
        if (_error) return resolve(dispatch(notifyError(_error.message)));

        dispatch(receiveRevealCommit());
        return resolve(dispatch(notifyTx(result, '', { type: txTypes.REVEAL_COMMIT })));
      });
    });
  });
};
