import Web3 from 'web3';
import RNS from '@rsksmart/rns';
import { hash as namehash } from 'eth-ens-namehash';
import { validateBytes32 } from '../../../validations';

import {
  requestResolver, receiveResolver, requestSetResolver, receiveSetResolver, errorSetResolver,
  waitingSetResolver, requestContent, receiveContent, errorContent, requestSetContent,
  receiveSetContent, errorSetContent, clearAllContent,
} from './actions';
import { getAllChainAddresses } from '../addresses/operations';

import {
  multiChainResolver as multiChainResolverAddress,
  publicResolver as publicResolverAddress,
  stringResolver as stringResolverAddress,
  definitiveResolver as definitiveResolverAddress,
} from '../../../adapters/configAdapter';
import { gasPrice as defaultGasPrice } from '../../../adapters/gasPriceAdapter';

import transactionListener from '../../../helpers/transactionListener';
import { getOptions } from '../../../adapters/RNSLibAdapter';
import { sendBrowserNotification } from '../../../browerNotifications/operations';

import {
  MULTICHAIN_RESOLVER, PUBLIC_RESOLVER, STRING_RESOLVER, UNKNOWN_RESOLVER,
  CONTENT_BYTES, CONTENT_BYTES_BLANK, DEFINITIVE_RESOLVER,
} from './types';

import { resolverAbi, abstractResolverAbi } from './abis.json';
import { interfaces } from './supportedInterfaces.json';

const web3 = new Web3(window.ethereum);
const rns = new RNS(web3, getOptions());

/**
 * Returns user friendly name based on address
 * @param {address} address the resolver address
 */
export const getResolverNameByAddress = (resolverAddr) => {
  switch (resolverAddr.toLowerCase()) {
    case multiChainResolverAddress:
      return MULTICHAIN_RESOLVER;
    case publicResolverAddress:
      return PUBLIC_RESOLVER;
    case stringResolverAddress:
      return STRING_RESOLVER;
    case definitiveResolverAddress:
      return DEFINITIVE_RESOLVER;
    default:
      return UNKNOWN_RESOLVER;
  }
};

/**
 * Gets the resolver for a specified domain
 * @param {string} domain the domain to get the resolver address
 */
export const getDomainResolver = domain => async (dispatch) => {
  dispatch(requestResolver());
  const hash = namehash(domain);

  await rns.compose();
  await rns.contracts.registry.methods.resolver(hash)
    .call((error, result) => {
      dispatch(receiveResolver(result, getResolverNameByAddress(result)));
    });
};


/**
 * Get the content Bytes from the given resolver
 * @param {address} resolverAddress to be queried
 * @param {string} domain
 */
export const getContentBytes = (resolverAddress, domain) => (dispatch) => {
  dispatch(requestContent(CONTENT_BYTES));

  const resolver = new web3.eth.Contract(
    resolverAbi, resolverAddress, { gasPrice: defaultGasPrice },
  );

  const hash = namehash(domain);

  resolver.methods.content(hash).call()
    .then(value => dispatch(
      receiveContent(CONTENT_BYTES, (value === CONTENT_BYTES_BLANK) ? '' : value),
    ))
    .catch(error => dispatch(errorContent(CONTENT_BYTES, error)));
};

/**
 * Loops through manager's supported interfaces and checks if resolver also supports them.
 * Currently, CONTENT_BYTES is the only content type supported.
 * @param {address} resolverAddress
 * @param {string} domain
 */
export const supportedInterfaces = (resolverAddress, domain) => (dispatch) => {
  dispatch(clearAllContent());
  const abstractResolver = new web3.eth.Contract(abstractResolverAbi, resolverAddress);

  // loop throgh supported interfaces and if CONTENT_BYTES
  interfaces.forEach((i) => {
    abstractResolver.methods
      .supportsInterface(i.interfaceId).call()
      .then((supportsInterface) => {
        if (supportsInterface && i.name === CONTENT_BYTES) {
          dispatch(getContentBytes(resolverAddress, domain));
        }
      });
  });
};


/**
 * Sets the resolver for a specified domain
 * @param {string} domain the domain to set
 * @param {address} resolverAddress the address to be set
 */
export const setDomainResolver = (domain, resolverAddress) => async (dispatch) => {
  dispatch(requestSetResolver());

  const lowerResolverAddress = resolverAddress.toLowerCase();

  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];
  const hash = namehash(domain);

  await rns.compose();
  await rns.contracts.registry.methods.setResolver(hash, lowerResolverAddress)
    .send({ from: currentAddress }, (error, result) => {
      dispatch(waitingSetResolver());
      if (error) {
        return dispatch(errorSetResolver(error.message));
      }

      const transactionConfirmed = () => () => {
        const resolverName = getResolverNameByAddress(lowerResolverAddress);
        dispatch(receiveSetResolver(
          result, lowerResolverAddress, resolverName,
        ));
        dispatch(getAllChainAddresses(domain, resolverName));
        dispatch(supportedInterfaces(lowerResolverAddress, domain));
        sendBrowserNotification(domain, 'resolver_set_success');
      };

      return dispatch(
        transactionListener(result, () => transactionConfirmed()),
      );
    });
};

/**
 * Sets the ContentBytes for the domain
 * @param {address} resolverAddress address of the Resolver used
 * @param {string} domain to be associated with the data
 * @param {bytes32} value to be set
 */
const setContentBytes = (resolverAddress, domain, value) => async (dispatch) => {
  dispatch(requestSetContent(CONTENT_BYTES));

  // validation
  if (validateBytes32(value)) {
    return dispatch(errorSetContent(CONTENT_BYTES, validateBytes32(value)));
  }

  const resolver = new web3.eth.Contract(
    resolverAbi, resolverAddress, { gasPrice: defaultGasPrice },
  );

  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];

  return resolver.methods.setContent(namehash(domain), value).send(
    { from: currentAddress }, (error, result) => {
      if (error) {
        return dispatch(errorSetContent(CONTENT_BYTES, error.message));
      }

      const transactionConfirmed = () => () => {
        dispatch(receiveSetContent(
          CONTENT_BYTES, result, (value === CONTENT_BYTES_BLANK) ? '' : value,
        ));
        sendBrowserNotification(domain, 'record_set');
      };

      return dispatch(transactionListener(result, () => transactionConfirmed()));
    },
  );
};

/**
 * Function to handle content type when setting. This will be expanded as more
 * content types are supported. Currently, CONTENT_BYTES is the only content type
 * @param {const} contentType
 * @param {address} resolverAddress address of the resolver
 * @param {string} domain domain the content is associated with
 * @param {string} value value of the content
 */
export const setContent = (contentType, resolverAddress, domain, value) => (dispatch) => {
  if (contentType === CONTENT_BYTES) {
    dispatch(setContentBytes(resolverAddress, domain, value));
  }
};
