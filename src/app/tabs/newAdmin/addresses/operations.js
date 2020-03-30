import Web3 from 'web3';
import { hash as namehash } from 'eth-ens-namehash';

import {
  multiChainResolver as multiChainResolverAddress,
  publicResolver as publicResolverAddress,
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

/**
 * Helper Function to get the chain name with the ID
 * @param {chaindId} chaindId the chainId to be looked up
 */
export const getChainNameById = (chainId) => {
  const network = networks.filter(net => net.id === chainId);
  return network[0].name;
};

/**
 * Set the chain Address for a specific domian
 * @param {string} domain the domain the address is for
 * @param {chainId} chainId the chainId to be set
 * @param {address} address the address for the chainId
 */
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


/**
 * Get the chain Address for a specific domian
 * @param {string} domain the domain the address is for
 * @param {chainId} chainId the chainId requested
 */
export const getChainAddresses = (domain, chainId) => async (dispatch) => {
  dispatch(requestChainAddress());

  const hash = namehash(domain);
  const chainName = getChainNameById(chainId);

  return new Promise((resolve) => {
    resolver.methods.chainAddr(hash, chainId).call((error, result) => {
      if (error) {
        return errorChainAddress(chainName, error.message);
      }
      return resolve(dispatch(receiveChainAddress(chainId, chainName, result)));
    });
  });
};

/**
 * Loops through all of the possible chainIds and calls
 * getChainAddress
 * @param {string} domain the domain to get the addresses
 */
export const getAllChainAddresses = domain => (dispatch) => {
  networks.map(network => dispatch(getChainAddresses(domain, network.id)));
};

/**
 * Decides to set the address value to '' or 0x0 depending on content
 * type and then passes the value to setChainAddress()
 * @param {string} domain the domain to get the addresses
 * @param {chainId} chainId the chainId requested
 */
export const deleteChainAddress = (domain, chainId) => (dispatch) => {
  const isHex = networks.filter(net => net.id === chainId)[0].validation === 'HEX';
  const value = isHex ? '0x0000000000000000000000000000000000000000' : '';
  dispatch(setChainAddress(domain, chainId, value));
};
