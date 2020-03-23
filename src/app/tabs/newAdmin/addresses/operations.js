import Web3 from 'web3';
import { hash as namehash } from 'eth-ens-namehash';

import {
  multiChainResolver as resolverAddress,
} from '../../../adapters/configAdapter';
import { gasPrice as defaultGasPrice } from '../../../adapters/gasPriceAdapter';

import {
  requestSetChainAddress, errorSetChainAddress, waitingSetChainAddress,
  receiveSetChainAddress, requestChainAddress, receiveChainAddress,
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
  dispatch(requestSetChainAddress());

  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];
  const hash = namehash(domain);

  resolver.methods.setChainAddr(hash, chainId, address).send(
    { from: currentAddress }, (error, result) => {
      dispatch(waitingSetChainAddress());
      if (error) {
        return dispatch(errorSetChainAddress(error.message));
      }
      const transactionConfirmed = () => () => {
        dispatch(receiveSetChainAddress(result));
        // add address to list:
        dispatch(receiveChainAddress(chainId, getChainNameById(chainId), address));
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
        return errorChainAddress(error.message);
      }
      if (result === '' || result === '0x0000000000000000000000000000000000000000') {
        return errorChainAddress(`chain address for ${chainName} not set`);
      }
      return resolve(dispatch(receiveChainAddress(chainId, chainName, result)));
    });
  });
};

export const getAllChainAddresses = domain => (dispatch) => {
  networks.map(network => dispatch(getChainAddresses(domain, network.name, network.id)));
};
