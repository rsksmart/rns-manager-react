import {
  requestDomainOwner, receiveDomainOwner, requestSetOwner, receiveSetOwner, errorSetOwner,
  requestDomainResolver, receiveDomainResolver, requestSetResolver, receiveSetResolver, errorSetResolver,
  requestDomainTtl, receiveDomainTtl, requestSetTtl, receiveSetTtl, errorSetTtl,
  addSubdomain as addSubdomainAction, receiveSubdomainOwner,
  requestSetSubdomainOwner, receiveSetSubdomainOwner, errorSetSubdomainOwner
} from './actions';
import { rns as registryAddress } from '../../../config/contracts';
import { hash as namehash } from 'eth-ens-namehash';
import { keccak_256 as sha3 } from 'js-sha3';

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
  },
  {
    "constant": false,
    "inputs": [
      { "name": "node", "type": "bytes32" },
      { "name": "ttl", "type": "uint64" }
    ],
    "name": "setTTL",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      { "name": "node", "type": "bytes32" },
      { "name": "label", "type": "bytes32" },
      { "name": "ownerAddress", "type": "address" }
    ],
    "name": "setSubnodeOwner",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
]).at(registryAddress);

export const getDomainOwner = domain => dispatch => {
  dispatch(requestDomainOwner(domain));

  const hash = namehash(domain);

  return new Promise(resolve => {
    registry.owner(hash, (error, result) => {
      if(error) return resolve(dispatch(receiveDomainOwner(error.message)));
      return resolve(dispatch(receiveDomainOwner(result)));
    });
  });
};

export const setDomainOwner = (domain, owner) => dispatch => {
  dispatch(requestSetOwner(domain, owner));

  const hash = namehash(domain);

  return new Promise((resolve) => {
    registry.setOwner(hash, owner, (error, result) => {
      if(error) return resolve(dispatch(errorSetOwner(error)));
      return resolve(dispatch(receiveSetOwner(result)));
    });
  });
};

export const getDomainResolver = domain => dispatch => {
  dispatch(requestDomainResolver(domain));

  const hash = namehash(domain);

  return new Promise(resolve => {
    registry.resolver(hash, (error, result) => {
      if(error) return resolve(dispatch(receiveDomainResolver(error.message)));
      return resolve(dispatch(receiveDomainResolver(result)));
    });
  });
};

export const setDomainResolver = (domain, resolver) => dispatch => {
  dispatch(requestSetResolver(domain, resolver));

  const hash = namehash(domain);

  return new Promise((resolve) => {
    registry.setResolver(hash, resolver, (error, result) => {
      if(error) return resolve(dispatch(errorSetResolver(error)));
      return resolve(dispatch(receiveSetResolver(result)));
    });
  });
};

export const getDomainTtl = domain => dispatch => {
  dispatch(requestDomainTtl(domain));

  const hash = namehash(domain);

  return new Promise(resolve => {
    registry.ttl(hash, (error, result) => {
      if(error) return resolve(dispatch(receiveDomainTtl(error.message)));
      return resolve(dispatch(receiveDomainTtl(result.toNumber())));
    });
  });
};

export const setDomainTtl = (domain, owner) => dispatch => {
  dispatch(requestSetTtl(domain, owner));

  const hash = namehash(domain);

  return new Promise((resolve) => {
    registry.setTTL(hash, owner, (error, result) => {
      if(error) return resolve(dispatch(errorSetTtl(error)));
      return resolve(dispatch(receiveSetTtl(result)));
    });
  });
};

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

export const setSubdomainOwner = (parent, child, owner) => dispatch => {
  dispatch(requestSetSubdomainOwner(child));

  const label = `0x${sha3(child)}`;
  const node = namehash(parent);

  return new Promise(resolve => {
    registry.setSubnodeOwner(node, label, owner, (error, result) => {
      if (error) return resolve(dispatch(errorSetSubdomainOwner(child, error)));
      return resolve(dispatch(receiveSetSubdomainOwner(child, result)));
    });
  });
};
