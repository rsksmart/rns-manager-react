import Web3 from 'web3';
import { keccak_256 as sha3 } from 'js-sha3';
import {
  requestGetCost, receiveGetCost,
  requestCommitRegistrar, receiveCommitRegistrar, errorRegistrarCommit,
  requestRevealCommit, receiveRevealCommit, receiveCanRevealCommit,
  errorRevealCommit, saltNotFound, commitTxMined, revealTxMined,
  requestConversionRate, recieveConversionRate,
} from './actions';
import {
  fifsRegistrar as fifsRegistrarAddress,
  fifsAddrRegistrar as fifsAddrRegistrarAddress,
  rif as rifAddress,
} from '../../adapters/configAdapter';
import { gasPrice as defaultGasPrice } from '../../adapters/gasPriceAdapter';
import { notifyError, notifyTx, txTypes } from '../../notifications';
import { fifsRegistrarAbi, fifsAddrRegistrarAbi, rifAbi } from './abis.json';
import { getRegisterData, getAddrRegisterData } from './helpers';

export const getCost = (domain, duration) => async (dispatch) => {
  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];

  const web3 = new Web3(window.ethereum);
  const rif = new web3.eth.Contract(rifAbi, rifAddress);

  const registrar = new web3.eth.Contract(fifsRegistrarAbi, fifsRegistrarAddress);

  dispatch(requestGetCost(duration));

  return new Promise((resolve) => {
    registrar.methods.price(domain, 0, duration).call((error, cost) => {
      if (error) return resolve(dispatch(notifyError(error.message)));

      return rif.methods.balanceOf(currentAddress).call((balanceError, balance) => {
        if (balanceError) return resolve(dispatch(notifyError(balanceError.message)));

        const enoughBalance = web3.utils.toBN(balance).gte(web3.utils.toBN(cost));
        return dispatch(receiveGetCost(window.web3.toDecimal(cost / (10 ** 18)), enoughBalance));
      });
    });
  });
};

export const getConversionRate = () => async (dispatch) => {
  dispatch(requestConversionRate());

  return new Promise((resolve) => {
    fetch('https://api.coinmarketcap.com/v1/ticker/rif-token/')
      .then(res => res.json())
      .then(data => resolve(dispatch(recieveConversionRate(parseFloat(data[0].price_usd)))))
      .catch((error) => {
        resolve(dispatch(notifyError(error)));
      });
  });
};

export const commit = (domain, setupAddr) => async (dispatch) => {
  dispatch(requestCommitRegistrar());

  const randomBytes = window.crypto.getRandomValues(new Uint8Array(32));
  const strSalt = Array.from(randomBytes).map(byte => byte.toString(16)).join('');
  const salt = `0x${strSalt.padEnd(64, '0')}`;

  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];

  const web3 = new Web3(window.ethereum);

  const abi = setupAddr ? fifsAddrRegistrarAbi : fifsRegistrarAbi;
  const address = setupAddr ? fifsAddrRegistrarAddress : fifsRegistrarAddress;

  const registrar = new web3.eth.Contract(
    abi, address, { from: currentAddress, gasPrice: defaultGasPrice },
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

export const checkCanReveal = (hash, setupAddr) => async (dispatch) => {
  const abi = setupAddr ? fifsAddrRegistrarAbi : fifsRegistrarAbi;
  const address = setupAddr ? fifsAddrRegistrarAddress : fifsRegistrarAddress;

  const registrar = window.web3.eth.contract(abi).at(address);

  return new Promise((resolve) => {
    registrar.canReveal(hash, (error, canReveal) => {
      if (error) return resolve(dispatch(notifyError(error.message)));

      return dispatch(receiveCanRevealCommit(canReveal));
    });
  });
};

export const checkIfAlreadyCommitted = (domain, setupAddr) => async (dispatch) => {
  const salt = localStorage.getItem(`${domain}-salt`);

  if (!salt) return dispatch(saltNotFound());

  dispatch(requestCommitRegistrar());

  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];

  const abi = setupAddr ? fifsAddrRegistrarAbi : fifsRegistrarAbi;
  const address = setupAddr ? fifsAddrRegistrarAddress : fifsRegistrarAddress;

  const registrar = window.web3.eth.contract(abi).at(address);
  return new Promise((resolve) => {
    registrar.makeCommitment(`0x${sha3(domain)}`, currentAddress, salt, (error, hashCommit) => {
      if (error) return resolve(dispatch(notifyError(error.message)));

      dispatch(receiveCommitRegistrar(hashCommit, true));

      return resolve(dispatch(checkCanReveal(hashCommit)));
    });
  });
};

export const revealCommit = (domain, tokens, duration, setupAddr) => async (dispatch) => {
  dispatch(requestRevealCommit());

  const weiValue = tokens * (10 ** 18);
  const salt = localStorage.getItem(`${domain}-salt`);
  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];
  const durationBN = window.web3.toBigNumber(duration);

  const data = setupAddr
    ? getAddrRegisterData(domain, currentAddress, salt, durationBN, currentAddress)
    : getRegisterData(domain, currentAddress, salt, durationBN);

  const fifsAddress = setupAddr ? fifsAddrRegistrarAddress : fifsRegistrarAddress;

  const web3 = new Web3(window.ethereum);
  const rif = new web3.eth.Contract(
    rifAbi, rifAddress, { from: currentAddress, gasPrice: defaultGasPrice },
  );

  return new Promise((resolve) => {
    rif
      .methods
      .transferAndCall(fifsAddress, weiValue.toString(), data)
      .send((error, result) => {
        if (error) {
          dispatch(errorRevealCommit());
          return resolve(dispatch(notifyError(error.message)));
        }

        localStorage.setItem('name', `${domain}.rsk`);
        localStorage.removeItem(`${domain}-salt`);

        dispatch(receiveRevealCommit());
        return resolve(dispatch(notifyTx(result, '', { type: txTypes.REVEAL_COMMIT }, () => dispatch(revealTxMined()))));
      });
  });
};
