import Web3 from 'web3';
import RNS from '@rsksmart/rns';
import { hash as namehash } from 'eth-ens-namehash';
import {
  requestResolver, receiveResolver, requestSetResolver, receiveSetResolver, errorSetResolver,
  waitingSetResolver,
} from './actions';

import {
  multiChainResolver as multiChainResolverAddress,
  publicResolver as publicResolverAddress,
  stringResolver as stringResolverAddress,
} from '../../../adapters/configAdapter';

import transactionListener from '../../../helpers/transactionListener';
import { getOptions } from '../../../adapters/RNSLibAdapter';
import { sendBrowserNotification } from '../../../browerNotifications/operations';

const web3 = new Web3(window.ethereum);
const rns = new RNS(web3, getOptions());

/**
 * Returns user friendly name based on address
 * @param {address} address the resolver address
 */
export const getResolverNameByAddress = (address) => {
  switch (address.toLowerCase()) {
    case multiChainResolverAddress:
      return 'MultiChain Resolver';
    case publicResolverAddress:
      return 'RSK Address Resolver';
    case stringResolverAddress:
      return 'String Resolver';
    default:
      return 'Custom Resolver';
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
        dispatch(receiveSetResolver(
          result, resolverAddress, getResolverNameByAddress(resolverAddress),
        ));
        sendBrowserNotification(domain, 'migration_complete');
      };

      return dispatch(
        transactionListener(result, () => transactionConfirmed()),
      );
    });
};
