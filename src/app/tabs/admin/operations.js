import {
  requestDomainOwner, receiveDomainOwner, requestSetOwner, receiveSetOwner, errorSetOwner,
  requestDomainResolver, receiveDomainResolver, requestSetResolver, receiveSetResolver, errorSetResolver,
  requestDomainTTL, receiveDomainTTL,
  addSubdomain as addSubdomainAction, receiveSubdomainOwner
} from './actions';
import { rns as registryAddress } from '../../../config/contracts';
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
  },
  {
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
  {
    "constant": false,
    "inputs": [
      { "name": "node", "type": "bytes32" },
      { "name": "ownerAddress", "type": "address" }
    ],
    "name": "setOwner",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      { "name": "node", "type": "bytes32" },
      { "name": "resolverAddress", "type": "address" }
    ],
    "name": "setResolver",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]).at(registryAddress);

export const getDomainOwner = domain => dispatch => {
  dispatch(requestDomainResolver(domain));

  const hash = namehash(domain);

  return new Promise(resolve => {
    registry.owner(hash, (error, result) => {
      if(error) return resolve(dispatch(receiveDomainOwner(error.message)))
      return resolve(dispatch(receiveDomainOwner(result)));
    });
  });
}

export const setDomainOwner = (domain, owner) => dispatch => {
  dispatch(requestSetResolver(domain, owner));

  const hash = namehash(domain);

  return new Promise((resolve) => {
    registry.setOwner(hash, owner, (error, result) => {
      if(error) return resolve(dispatch(errorSetOwner(error)));
      return resolve(dispatch(receiveSetOwner(result)));
    })
  })
}

export const getDomainResolver = domain => dispatch => {
  dispatch(requestDomainOwner(domain));

  const hash = namehash(domain);

  return new Promise(resolve => {
    registry.resolver(hash, (error, result) => {
      if(error) return resolve(dispatch(receiveDomainResolver(error.message)))
      return resolve(dispatch(receiveDomainResolver(result)));
    });
  });
}

export const setDomainResolver = (domain, owner) => dispatch => {
  dispatch(requestSetOwner(domain, owner));

  const hash = namehash(domain);

  return new Promise((resolve) => {
    registry.setResolver(hash, owner, (error, result) => {
      if(error) return resolve(dispatch(errorSetResolver(error)));
      return resolve(dispatch(receiveSetResolver(result)));
    })
  })
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

export const addSubdomain = (domain, subdomain) => dispatch => {
  if(!subdomain) return;

  dispatch(addSubdomainAction(subdomain));

  const hash = namehash(`${subdomain}.${domain}`);

  return new Promise((resolve, reject) => {
    registry.owner(hash, (error, result) => {
      if(error) reject(error);

      dispatch(receiveSubdomainOwner(subdomain, result));

      resolve(result);
    })
  })
}
