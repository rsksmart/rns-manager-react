import { utils } from 'web3';
import {
  requestGetCost, receiveGetCost,
  requestCommitRegistrar, receiveCommitRegistrar, errorRegistrarCommit,
  requestRevealCommit, receiveRevealCommit, receiveCanRevealCommit,
} from './actions';
import {
  fifsRegistrar as fifsRegistrarAddress,
  rif as rifAddress,
} from '../../../config/contracts';
import { notifyError, notifyTx, txTypes } from '../../notifications';
import { fifsRegistrarAbi, rifAbi } from './abis.json';

export const getCost = (domain, duration) => (dispatch) => {
  const registrar = window.web3.eth.contract(fifsRegistrarAbi).at(fifsRegistrarAddress);

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

  const registrar = window.web3.eth.contract(fifsRegistrarAbi).at(fifsRegistrarAddress);

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
  const registrar = window.web3.eth.contract(fifsRegistrarAbi).at(fifsRegistrarAddress);

  return new Promise((resolve) => {
    registrar.canReveal(hash, (error, canReveal) => {
      if (error) return resolve(dispatch(notifyError(error.message)));

      return dispatch(receiveCanRevealCommit(canReveal));
    });
  });
};

function numberToUint32(number) {
  const hexDuration = utils.numberToHex(number);
  let duration = '';
  for (let i = 0; i < 66 - hexDuration.length; i += 1) {
    duration += '0';
  }
  duration += hexDuration.slice(2);
  return duration;
}

function utf8ToHexString(string) {
  return string ? utils.asciiToHex(string).slice(2) : '';
}

function getRegisterData(_name, _owner, _secret, _duration) {
  // 0x + 8 bytes
  const signature = utils.sha3('registerWithToken(string,address,bytes32,uint,address,uint)').slice(0, 10);

  // 20 bytes
  const owner = _owner.toLowerCase().slice(2);

  // 32 bytes
  let secret = _secret.slice(2);
  const padding = 64 - _secret.length;
  for (let i = 0; i < padding; i += 1) {
    secret += '0';
  }

  // 32 bytes
  const duration = numberToUint32(_duration);

  // variable length
  const name = utf8ToHexString(_name);

  return `${signature}${owner}${secret}${duration}${name}`;
}

export const revealCommit = (domain, tokens, duration) => async (dispatch) => {
  dispatch(requestRevealCommit());

  const weiValue = tokens * (10 ** 18);

  const salt = localStorage.getItem(`${domain}-salt`);
  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];
  const data = getRegisterData(domain, currentAddress, salt, duration);

  const rif = window.web3.eth.contract(rifAbi).at(rifAddress);

  return new Promise((resolve) => {
    rif.transferAndCall(fifsRegistrarAddress, weiValue, `0x1413151f${data.slice(2)}`, (error, result) => {
      if (error) return resolve(dispatch(notifyError(error.message)));

      dispatch(receiveRevealCommit());
      return resolve(dispatch(notifyTx(result, '', { type: txTypes.REVEAL_COMMIT })));
    });
  });
};
