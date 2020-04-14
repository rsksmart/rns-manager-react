import Web3 from 'web3';
import RNS from '@rsksmart/rns';
import { hash as namehash } from 'eth-ens-namehash';
import { validateBytes32 } from '../../../validations';

import {
  requestResolver, receiveResolver, requestSetResolver, receiveSetResolver, errorSetResolver,
  waitingSetResolver, requestContent, receiveContent, errorContent, requestSetContent,
  receiveSetContent, errorSetContent,
} from './actions';
import { getAllChainAddresses } from '../addresses/operations';

import {
  multiChainResolver as multiChainResolverAddress,
  publicResolver as publicResolverAddress,
  stringResolver as stringResolverAddress,
} from '../../../adapters/configAdapter';
import { gasPrice as defaultGasPrice } from '../../../adapters/gasPriceAdapter';

import transactionListener from '../../../helpers/transactionListener';
import { getOptions } from '../../../adapters/RNSLibAdapter';
import { sendBrowserNotification } from '../../../browerNotifications/operations';

import {
  MULTICHAIN_RESOLVER, PUBLIC_RESOLVER, STRING_RESOLVER, UNKNOWN_RESOLVER,
  CONTENT_HASH, CONTENT_HASH_BLANK,
} from './types';

import { resolverAbi } from './abis.json';

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
 * Sets the resolver for a specified domain
 * @param {string} domain the domain to set
 * @param {address} resolverAddress the address to be set
 */
export const setDomainResolver = (domain, resolverAddress) => async (dispatch) => {
  dispatch(requestSetResolver());

  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];
  const hash = namehash(domain);

  await rns.compose();
  await rns.contracts.registry.methods.setResolver(hash, resolverAddress)
    .send({ from: currentAddress }, (error, result) => {
      dispatch(waitingSetResolver());
      if (error) {
        return dispatch(errorSetResolver(error.message));
      }

      const transactionConfirmed = () => () => {
        const resolverName = getResolverNameByAddress(resolverAddress);
        dispatch(receiveSetResolver(
          result, resolverAddress, resolverName,
        ));
        dispatch(getAllChainAddresses(domain, resolverName));
        sendBrowserNotification(domain, 'resolver_set_success');
      };

      return dispatch(
        transactionListener(result, () => transactionConfirmed()),
      );
    });
};

/**
 * Get the content hash from the given resolver
 * @param {address} resolverAddress to be queried
 * @param {string} domain
 */
export const getContentHash = (resolverAddress, domain) => (dispatch) => {
  dispatch(requestContent(CONTENT_HASH));

  const resolver = new web3.eth.Contract(
    resolverAbi, resolverAddress, { gasPrice: defaultGasPrice },
  );

  const hash = namehash(domain);

  resolver.methods.content(hash).call()
    .then(value => dispatch(
      receiveContent(CONTENT_HASH, (value === CONTENT_HASH_BLANK) ? '' : value),
    ))
    .catch(error => dispatch(errorContent(CONTENT_HASH, error)));
};

export const setContentHash = (resolverAddress, domain, value) => async (dispatch) => {
  dispatch(requestSetContent(CONTENT_HASH));

  // validation
  if (validateBytes32(value)) {
    return dispatch(errorSetContent(CONTENT_HASH, validateBytes32(value)));
  }

  const resolver = new web3.eth.Contract(
    resolverAbi, resolverAddress, { gasPrice: defaultGasPrice },
  );

  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];

  resolver.methods.setContent(namehash(domain), value).send(
    { from: currentAddress }, (error, result) => {
      // dispatch(waitingSetContent(CONTENT_HASH));

      if (error) {
        return dispatch(errorSetContent(CONTENT_HASH, error.message));
      }

      const transactionConfirmed = () => () => {
        dispatch(receiveSetContent(CONTENT_HASH, result, value));
      };

      return dispatch(transactionListener(result, () => transactionConfirmed()));
    },
  );
};
