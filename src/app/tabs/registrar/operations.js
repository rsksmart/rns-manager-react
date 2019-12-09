import Web3 from 'web3';
import { keccak_256 as sha3 } from 'js-sha3';
import {
  requestGetCost, receiveGetCost,
  requestCommitRegistrar, receiveCommitRegistrar, errorRegistrarCommit,
  requestRevealCommit, receiveRevealCommit, receiveCanRevealCommit,
  errorRevealCommit, saltNotFound, commitTxMined, revealTxMined,
} from './actions';
import {
  fifsRegistrar as fifsRegistrarAddress,
  rif as rifAddress,
  gasPrice as defaultGasPrice,
} from '../../../config/contracts.json';
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

export const commit = domain => async (dispatch) => {
  dispatch(requestCommitRegistrar());

  const randomBytes = window.crypto.getRandomValues(new Uint8Array(32));
  const salt = `0x${Array.from(randomBytes).map(byte => byte.toString(16)).join('')}`;

  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];

  const web3 = new Web3(window.ethereum);
  const registrar = new web3.eth.Contract(
    fifsRegistrarAbi, fifsRegistrarAddress, { from: currentAddress, gasPrice: defaultGasPrice },
  );

  return new Promise((resolve) => {
    registrar
      .methods
      .makeCommitment(`0x${sha3(domain)}`, currentAddress, salt)
      .call((error, hashCommit) => {
        if (error) return resolve(dispatch(notifyError(error.message)));

        return registrar.methods.commit(hashCommit).send((_error, result) => {
          if (_error) {
            dispatch(errorRegistrarCommit());
            return resolve(dispatch(notifyError(_error.message)));
          }

          localStorage.setItem(`${domain}-salt`, salt);
          dispatch(receiveCommitRegistrar(hashCommit));
          return resolve(dispatch(notifyTx(result, '', { type: txTypes.REGISTRAR_COMMIT }, () => dispatch(commitTxMined()))));
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

export const checkIfAlreadyCommitted = domain => async (dispatch) => {
  const salt = localStorage.getItem(`${domain}-salt`);

  if (!salt) return dispatch(saltNotFound());

  dispatch(requestCommitRegistrar());

  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];

  const registrar = window.web3.eth.contract(fifsRegistrarAbi).at(fifsRegistrarAddress);
  return new Promise((resolve) => {
    registrar.makeCommitment(`0x${sha3(domain)}`, currentAddress, salt, (error, hashCommit) => {
      if (error) return resolve(dispatch(notifyError(error.message)));

      dispatch(receiveCommitRegistrar(hashCommit, true));

      return resolve(dispatch(checkCanReveal(hashCommit)));
    });
  });
};

export const revealCommit = (domain, tokens, duration) => async (dispatch) => {
  dispatch(requestRevealCommit());

  const weiValue = tokens * (10 ** 18);
  const salt = localStorage.getItem(`${domain}-salt`);
  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];
  const durationBN = window.web3.toBigNumber(duration);

  const data = getRegisterData(domain, currentAddress, salt, durationBN);

  const web3 = new Web3(window.ethereum);
  const rif = new web3.eth.Contract(
    rifAbi, rifAddress, { from: currentAddress, gasPrice: defaultGasPrice },
  );

  return new Promise((resolve) => {
    rif
      .methods
      .transferAndCall(fifsRegistrarAddress, weiValue.toString(), data)
      .send((error, result) => {
        if (error) {
          dispatch(errorRevealCommit());
          return resolve(dispatch(notifyError(error.message)));
        }

        dispatch(receiveRevealCommit());
        return resolve(dispatch(notifyTx(result, '', { type: txTypes.REVEAL_COMMIT }, () => dispatch(revealTxMined()))));
      });
  });
};
