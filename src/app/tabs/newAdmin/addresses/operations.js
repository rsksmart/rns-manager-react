import Web3 from 'web3';
import { hash as namehash } from 'eth-ens-namehash';

import {
  multiChainResolver as resolverAddress,
} from '../../../adapters/configAdapter';
import { gasPrice as defaultGasPrice } from '../../../adapters/gasPriceAdapter';

import {
  requestSetChainAddress, errorSetChainAddress, waitingSetChainAddress,
  requestChainAddress, receiveChainAddress, receiveSetChainAddress,
  errorChainAddress,
} from './actions';
import abi from '../../multiChainResolver/abi.json';

import transactionListener from '../../../helpers/transactionListener';
import networks from './networks.json';

const web3 = new Web3(window.ethereum);
const resolver = new web3.eth.Contract(abi, resolverAddress, { gasPrice: defaultGasPrice });

// helper function:
export const getChainNameById = (chainId) => {
  const network = networks.filter(net => net.id === chainId);
  return network[0].name;
};

export const setChainAddress = (domain, chainId, address) => async (dispatch) => {
  const chainName = getChainNameById(chainId);
  dispatch(requestSetChainAddress(chainName));

  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];
  const hash = namehash(domain);

  resolver.methods.setChainAddr(hash, chainId, address).send(
    { from: currentAddress }, (error, result) => {
      dispatch(waitingSetChainAddress(chainName));
      if (error) {
        return dispatch(errorSetChainAddress(chainName, error.message));
      }

      const transactionConfirmed = () => () => {
        dispatch(receiveSetChainAddress(chainId, getChainNameById(chainId), address, result));
      };

      return dispatch(transactionListener(result, () => transactionConfirmed()));
    },
  );
};

export const getChainAddresses = (domain, chainName, chainId) => async (dispatch) => {
  dispatch(requestChainAddress());

  const hash = namehash(domain);

  return new Promise((resolve) => {
    resolver.methods.chainAddr(hash, chainId).call((error, result) => {
      if (error) {
        return errorChainAddress(chainName, error.message);
      }
      return resolve(dispatch(receiveChainAddress(chainId, chainName, result)));
    });
  });
};

export const getAllChainAddresses = domain => (dispatch) => {
  networks.map(network => dispatch(getChainAddresses(domain, network.name, network.id)));
};

export const deleteChainAddress = (domain, networkId) => (dispatch) => {
  const isHex = networks.filter(net => net.id === networkId)[0].validation === 'HEX';
  const value = isHex ? '0x0000000000000000000000000000000000000000' : '';
  dispatch(setChainAddress(domain, networkId, value));
};
