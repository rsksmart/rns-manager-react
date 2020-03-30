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
  errorChainAddress, clearAddresses,
} from './actions';
import { publicResolverAbi, multichainResolverAbi } from './abis.json';

import transactionListener from '../../../helpers/transactionListener';
import networks from './networks.json';
import { PUBLIC_RESOLVER, MULTICHAIN_RESOLVER } from '../resolver/types';


const web3 = new Web3(window.ethereum);
const multichainResolver = new web3.eth.Contract(
  multichainResolverAbi, multiChainResolverAddress, { gasPrice: defaultGasPrice },
);
const publicResolver = new web3.eth.Contract(
  publicResolverAbi, publicResolverAddress, { gasPrice: defaultGasPrice },
);

/**
 * Helper Function to get the chain name with the ID
 * @param {chaindId} chaindId the chainId to be looked up
 */
export const getChainNameById = (chainId) => {
  const network = networks.filter(net => net.id === chainId);
  return network[0].name;
};

/**
 * Sets the RSK resolution when using the public resolver
 * @param {*} domain to set the address for
 * @param {*} address to resolve to
 */
const setPublicAddress = (domain, address) => async (dispatch) => {
  console.log('setting RSK public address for', domain, address);

  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];
  const hash = namehash(domain);

  publicResolver.methods.setAddr(hash, address).send(
    { from: currentAddress }, (error, result) => {
      dispatch(waitingSetChainAddress('RSK'));
      if (error) {
        return dispatch(errorSetChainAddress('RSK', error.message));
      }

      const transactionConfirmed = () => () => {
        dispatch(receiveSetChainAddress('0x80000089', 'RSK', address, result));
      };

      return dispatch(transactionListener(result, () => transactionConfirmed()));
    },
  );
};

/**
 * Sets an address in the multichain resolver
 * @param {*} domain to set the address for
 * @param {*} chainId that is assoicated with the address
 * @param {*} address the address or valud to set for the chainId
 */
const setMultiChainAddress = (domain, chainId, address) => async (dispatch) => {
  const chainName = getChainNameById(chainId);
  dispatch(requestSetChainAddress(chainName));

  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];
  const hash = namehash(domain);

  multichainResolver.methods.setChainAddr(hash, chainId, address).send(
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
 * Selects the correct resolver set function based one resolverName
 * @param {string} domain the domain the address is for
 * @param {chainId} chainId the chainId to be set
 * @param {address} address the address for the chainId
 */
export const setChainAddress = (domain, chainId, address, resolverName) => async (dispatch) => {
  switch (resolverName) {
    case PUBLIC_RESOLVER:
      dispatch(setPublicAddress(domain, address));
      break;
    case MULTICHAIN_RESOLVER:
      dispatch(setMultiChainAddress(domain, chainId, address));
      break;
    default:
      // string resolver or unknown/custom resolver
  }
};

/**
 * Get the RSK resolved address using the Public Resolver
 * @param {string} domain the domain the address is for
 */
export const getPublicChainAddresses = domain => async (dispatch) => {
  dispatch(requestChainAddress());
  const hash = namehash(domain);

  return new Promise((resolve) => {
    publicResolver.methods.addr(hash).call((error, result) => {
      if (error) {
        return errorChainAddress('RSK', error.message);
      }
      return resolve(dispatch(receiveChainAddress('0x80000089', 'RSK', result)));
    });
  });
};

/**
 * Get the chain Address for a specific domian using the MultiChain Resolver
 * @param {string} domain the domain the address is for
 * @param {chainId} chainId the chainId requested
 */
export const getMultiChainAddresses = (domain, chainId) => async (dispatch) => {
  dispatch(requestChainAddress());

  const hash = namehash(domain);
  const chainName = getChainNameById(chainId);

  return new Promise((resolve) => {
    multichainResolver.methods.chainAddr(hash, chainId).call((error, result) => {
      if (error) {
        return errorChainAddress(chainName, error.message);
      }
      return resolve(dispatch(receiveChainAddress(chainId, chainName, result)));
    });
  });
};

/**
 * Gets chain addresses if the resolver is set to public or multichain.
 * In the case of multichain, it loops through all of the possible chainIds
 * and calls getChainAddress
 * @param {string} domain the domain to get the addresses
 * @param {const} resolverName the name of the resolver for the domain
 */
export const getAllChainAddresses = (domain, resolverName) => (dispatch) => {
  dispatch(clearAddresses());
  switch (resolverName) {
    case PUBLIC_RESOLVER:
      dispatch(getPublicChainAddresses(domain));
      break;
    case MULTICHAIN_RESOLVER:
      networks.map(network => dispatch(getMultiChainAddresses(domain, network.id)));
      break;
    default:
      // string resolver or unknown/custom resolver
  }
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
