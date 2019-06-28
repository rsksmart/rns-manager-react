import * as actions from './actions';
import Web3 from 'web3';
import { rskMain } from '../../../config/nodes';
import { rnsAbi, abstractResolverAbi } from './abis';
import { rns as rnsAddress } from '../../../config/contracts';
import { hash as namehash } from 'eth-ens-namehash';
import resolverInterfaces from './resolverInterfaces';

export const identifyInterfaces = domain => dispatch => {
  if (!domain) {
    return dispatch(actions.receiveResolve(''));
  }

  dispatch(actions.requestResolve());

  const hash = namehash(domain);

  const web3 = new Web3(rskMain);

  const rns = new web3.eth.Contract(rnsAbi, rnsAddress);

  rns.methods.resolver(hash).call()
  .then(resolverAddress => {
    if (resolverAddress === '0x0000000000000000000000000000000000000000') {
      return dispatch(actions.errorResolve('this name is not registered'));
    }

    dispatch(actions.receiveResolverAddress(resolverAddress));

    const abstractResolver = new web3.eth.Contract(abstractResolverAbi, resolverAddress);

    let resolutions = [];

    for (const resolverInterface of resolverInterfaces) {
      const resolution = abstractResolver.methods.supportsInterface(resolverInterface.signature).call().then(supportsInterface => {
        if (supportsInterface) {
          dispatch(actions.receiveSupportedInterface(resolverInterface.name));
        }
      });

      resolutions.push(resolution);
    }

    if (resolutions.length) {
      return Promise.all(resolutions).then(() => dispatch(actions.receiveResolve()));
    }

    dispatch(actions.errorResolve('no resolution found'));
  })
  .catch(error => dispatch(actions.errorResolve(error.message)));
};

export const addr = (resolverAddress, name) => dispatch => {
  dispatch(actions.requestAddr());

  const web3 = new Web3(rskMain);

  const addrReoslver = new web3.eth.Contract(resolverInterfaces[0].abi, resolverAddress);

  const hash = namehash(name);

  addrReoslver.methods.addr(hash).call().then(addr => {
    dispatch(actions.receiveAddr(addr));
  }).catch(error => dispatch(actions.errorAddr(error.message)));
}

export const chainAddr = (resolverAddress, name, chainId) => dispatch => {
  dispatch(actions.requestChainAddr());

  const web3 = new Web3(rskMain);

  const addrReoslver = new web3.eth.Contract(resolverInterfaces[1].abi, resolverAddress);

  const hash = namehash(name);

  addrReoslver.methods.chainAddr(hash, chainId).call().then(chainAddr => {
    dispatch(actions.receiveChainAddr(chainAddr));
  }).catch(error => dispatch(actions.errorChainAddr(error.message)));
}
