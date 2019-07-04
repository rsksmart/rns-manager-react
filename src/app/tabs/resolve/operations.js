import Web3 from 'web3';
import { hash as namehash } from 'eth-ens-namehash';
import * as actions from './actions';
import { rskMain } from '../../../config/nodes';
import { rnsAbi, abstractResolverAbi } from './abis';
import { rns as rnsAddress } from '../../../config/contracts';
import resolverInterfaces from './resolverInterfaces';

export const identifyInterfaces = domain => (dispatch) => {
  if (!domain) {
    return dispatch(actions.receiveResolve(''));
  }

  dispatch(actions.requestResolve());

  const hash = namehash(domain);

  const web3 = new Web3(rskMain);

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

  const web3 = new Web3(rskMain);

  const addrResolver = new web3.eth.Contract(resolverInterfaces[0].abi, resolverAddress);

  const hash = namehash(name);

  return addrResolver.methods.addr(hash).call().then((addrResolution) => {
    dispatch(actions.receiveAddr(addrResolution));
  }).catch(error => dispatch(actions.errorAddr(error.message)));
};

export const chainAddr = (resolverAddress, name, chainId) => (dispatch) => {
  dispatch(actions.requestChainAddr());

  const web3 = new Web3(rskMain);

  const addrResolver = new web3.eth.Contract(resolverInterfaces[1].abi, resolverAddress);

  const hash = namehash(name);

  return addrResolver.methods.chainAddr(hash, chainId).call().then((chainAddrResolution) => {
    dispatch(actions.receiveChainAddr(chainAddrResolution));
  }).catch(error => dispatch(actions.errorChainAddr(error.message)));
};
