import Web3 from 'web3';
import { hash as namehash } from 'eth-ens-namehash';
import { isValidAddress } from 'rskjs-util';
import RNS from '@rsksmart/rns';
import { formatsByCoinType } from '@ensdomains/address-encoder';
import * as actions from './actions';
import { rskNode } from '../../adapters/nodeAdapter';
import { rnsAbi, abstractResolverAbi } from './abis.json';
import { definitiveResolverAbi } from '../newAdmin/resolver/definitiveAbis.json';
import { rns as rnsAddress } from '../../adapters/configAdapter';
import resolverInterfaces from './resolverInterfaces.json';
import { getOptions } from '../../adapters/RNSLibAdapter';
import { ERROR_RESOLVE_NAME } from './types';
import { ERROR_SAME_VALUE, EMPTY_ADDRESS } from '../newAdmin/types';
import { getIndexById } from '../newAdmin/addresses/operations';

/**
 * Resolves a domain name using the js library
 * @param {string} domain to resolve
 * @param {bytes4} chainId to search, set as null if RKS to search both multichain and public
 * @param {function} errorFunction the function to dispatch if there is an error
 * @param {string} value the value to check the resolution against to see if they match
 */
export const resolveDomain = (
  domain, chainId = null, errorFunction = null, value = null,
) => async (dispatch) => {
  const web3 = new Web3(window.ethereum);
  const rns = new RNS(web3, getOptions());

  dispatch(actions.requestAddr());

  return rns.addr(domain, chainId)
    .then((response) => {
      // if the value is the same as the resolved domain
      if (value && (response.toLowerCase() === value.toLowerCase())) {
        dispatch(errorFunction(ERROR_SAME_VALUE));
        return false;
      }

      dispatch(actions.receiveAddr(response));
      return response.toLowerCase();
    })
    .catch((error) => {
      dispatch(actions.errorResolve(error));
      dispatch(errorFunction(ERROR_RESOLVE_NAME));
      return false;
    });
};

export const identifyInterfaces = domain => (dispatch) => {
  if (!domain) {
    return dispatch(actions.receiveResolve(''));
  }

  dispatch(actions.requestResolve());

  const hash = namehash(domain);

  const web3 = new Web3(rskNode);

  const rns = new web3.eth.Contract(rnsAbi, rnsAddress);

  return rns.methods.resolver(hash).call()
    .then((resolverAddress) => {
      if (resolverAddress === '0x0000000000000000000000000000000000000000') {
        return dispatch(actions.errorResolve('this name is not registered'));
      }

      dispatch(actions.receiveResolverAddress(resolverAddress));

      const abstractResolver = new web3.eth.Contract(abstractResolverAbi, resolverAddress);

      const resolutions = [];

      for (let i = 0; i < resolverInterfaces.length; i += 1) {
        const resolverInterface = resolverInterfaces[i];
        const resolution = abstractResolver.methods
          .supportsInterface(resolverInterface.signature).call().then((supportsInterface) => {
            if (supportsInterface) {
              return dispatch(actions.receiveSupportedInterface(resolverInterface.name));
            }

            return null;
          });

        resolutions.push(resolution);
      }

      if (resolutions.length) {
        return Promise.all(resolutions).then(() => dispatch(actions.receiveResolve()));
      }

      return dispatch(actions.errorResolve('no resolution found'));
    })
    .catch(error => dispatch(actions.errorResolve(error.message)));
};

export const addr = (resolverAddress, name) => (dispatch) => {
  dispatch(actions.requestAddr());

  const web3 = new Web3(rskNode);

  const addrResolver = new web3.eth.Contract(resolverInterfaces[0].abi, resolverAddress);

  const hash = namehash(name);

  return addrResolver.methods.addr(hash).call().then((addrResolution) => {
    dispatch(actions.receiveAddr(addrResolution));
  }).catch(error => dispatch(actions.errorAddr(error.message)));
};

export const chainAddr = (resolverAddress, name, chainId) => (dispatch) => {
  dispatch(actions.requestChainAddr());

  const web3 = new Web3(rskNode);

  const addrResolver = new web3.eth.Contract(resolverInterfaces[1].abi, resolverAddress);

  const hash = namehash(name);

  return addrResolver.methods.chainAddr(hash, chainId).call().then((chainAddrResolution) => {
    dispatch(actions.receiveChainAddr(chainAddrResolution));
  }).catch(error => dispatch(actions.errorChainAddr(error.message)));
};

export const multicoin = (resolverAddress, domain, chainId) => (dispatch) => {
  dispatch(actions.requestChainAddr());

  const hash = namehash(domain);
  const web3 = new Web3(rskNode);
  const resolver = new web3.eth.Contract(definitiveResolverAbi, resolverAddress);
  const chainIndex = getIndexById(chainId);

  return resolver.methods.addr(hash, chainIndex).call()
    .then((resolution) => {
      if (!resolution || resolution === EMPTY_ADDRESS) {
        return dispatch(actions.receiveChainAddr(''));
      }

      // eslint-disable-next-line new-cap
      const dataBuffer = new Buffer.from(resolution.replace('0x', ''), 'hex');
      const result = formatsByCoinType[chainIndex].encoder(dataBuffer);

      if (chainId === '0x80000089') {
        dispatch(actions.receiveAddr(result));
      }
      return dispatch(actions.receiveChainAddr(result));
    })
    .catch((error) => {
      dispatch(actions.errorChainAddr(error.message));
    });
};

export const name = (resolverAddress, address) => (dispatch) => {
  dispatch(actions.requestName());
  const web3 = new Web3(rskNode);

  const nameResolver = new web3.eth.Contract(resolverInterfaces[2].abi, resolverAddress);

  const value = isValidAddress(address) ? `${address.replace('0x', '')}.addr.reverse` : address;
  const hash = namehash(value);

  return nameResolver.methods.name(hash).call().then((nameResolution) => {
    dispatch(actions.receiveName(nameResolution));
  }).catch(error => dispatch(actions.errorName(error.message)));
};

export const contentHash = domain => (dispatch) => {
  dispatch(actions.requestContent('CONTENT_HASH'));
  const web3 = new Web3(window.ethereum);
  const rns = new RNS(web3, getOptions());

  rns.contenthash(domain)
    .then(result => dispatch(actions.receiveContent('CONTENT_HASH', result)))
    .catch(error => dispatch(actions.errorContent('CONTENT_HASH', error.message)));
};

export const searchAddressOrDomain = input => (dispatch) => {
  const value = isValidAddress(input) ? `${input.replace('0x', '')}.addr.reverse` : input;
  return dispatch(identifyInterfaces(value));
};

export const getAddress = (
  resolverAddress, supportedInterfaces, domain, chainId,
) => (dispatch) => {
  supportedInterfaces.forEach((interfaceId) => {
    switch (interfaceId) {
      case 'multicoin': return dispatch(multicoin(resolverAddress, domain, (chainId || '0x80000089')));
      case 'chainAddr': return dispatch(chainAddr(resolverAddress, domain, chainId));
      case 'addr': return dispatch(addr(resolverAddress, domain));
      case 'contenthash': return dispatch(contentHash(domain));
      default: return false;
    }
  });
};
