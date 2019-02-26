import {
  requestDomainOwner, receiveDomainOwner,
  requestDomainResolver, receiveDomainResolver,
  requestDomainTTL, receiveDomainTTL
} from './actions';
import { hash as namehash } from 'eth-ens-namehash';

const registry = window.web3.eth.contract([
  {
    "constant": true,
    "inputs": [
      { "name": "node", "type": "bytes32" }
    ],
    "name": "owner",
    "outputs": [
      { "name": "", "type": "address" }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      { "name": "node", "type": "bytes32" }
    ],
    "name": "resolver",
    "outputs": [
      { "name": "", "type": "address" }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },{
    "constant": true,
    "inputs": [
      { "name": "node", "type": "bytes32" }
    ],
    "name": "ttl",
    "outputs": [
      { "name": "", "type": "uint64" }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
]).at('0xcb868aeabd31e2b66f74e9a55cf064abb31a4ad5');

export const getDomainOwner = domain => dispatch => {
  if (!domain) {
    dispatch(receiveDomainOwner(''));
    return;
  }

  dispatch(requestDomainOwner(domain));

  const hash = namehash(domain);

  return new Promise((resolve, reject) => {
    registry.owner(hash, (error, result) => {
      if(error) reject(error);

      dispatch(receiveDomainOwner(result));

      resolve(result);
    });
  });
}

export const getDomainResolver = domain => dispatch => {
  if (!domain) {
    dispatch(receiveDomainResolver(''));
    return;
  }

  dispatch(requestDomainResolver(domain));

  const hash = namehash(domain);

  return new Promise((resolve, reject) => {
    registry.resolver(hash, (error, result) => {
      if(error) reject(error);

      dispatch(receiveDomainResolver(result));

      resolve(result);
    });
  });
}

export const getDomainTTL = domain => dispatch => {
  if (!domain) {
    dispatch(receiveDomainTTL(''));
    return;
  }

  dispatch(requestDomainTTL(domain));

  const hash = namehash(domain);

  return new Promise((resolve, reject) => {
    registry.ttl(hash, (error, result) => {
      if(error) reject(error);

      let ttl = result.toNumber();

      dispatch(receiveDomainTTL(ttl));

      resolve(ttl);
    });
  });
}
