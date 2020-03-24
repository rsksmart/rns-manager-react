import Web3 from 'web3';
import RNS from '@rsksmart/rns';
import { hash as namehash } from 'eth-ens-namehash';
import {
  requestResolver, receiveResolver, requestSetResolver, receiveSetResolver, errorSetResolver,
} from './actions';

import {
  multiChainResolver as multiChainResolverAddress,
  publicResolver as publicResolverAddress,
  stringResolver as stringResolverAddress,
} from '../../../adapters/configAdapter';

import JslibOptions from '../../../adapters/jslibAdapter';

const web3 = new Web3(window.ethereum);
const rns = new RNS(web3, JslibOptions());

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

export const getDomainResolver = domain => async (dispatch) => {
  dispatch(requestResolver());
  const hash = namehash(domain);

  await rns.compose();
  await rns.contracts.registry.methods.resolver(hash)
    .call((error, result) => {
      dispatch(receiveResolver(result, getResolverNameByAddress(result)));
    });
};

export const setDomainResolver = (domain, resolverAddress) => async (dispatch) => {
  console.log('setDomainResolver', domain, resolverAddress);
  dispatch(requestSetResolver());

  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];
  const hash = namehash(domain);

  await rns.compose();
  await rns.contracts.registry.methods.setResolver(hash, resolverAddress)
    .send({ from: currentAddress }, (error, result) => {
      if (error) {
        return dispatch(errorSetResolver(error.message));
      }

      return dispatch(
        receiveSetResolver(result, resolverAddress, getResolverNameByAddress(resolverAddress)),
      );
    });
};
