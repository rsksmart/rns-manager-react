import {
  requestDomainOwner, receiveDomainOwner, requestSetOwner, receiveSetOwner,
  requestDomainResolver, receiveDomainResolver, requestSetResolver, receiveSetResolver,
  requestDomainTtl, receiveDomainTtl, requestSetTtl, receiveSetTtl,
  addSubdomain as addSubdomainAction, receiveSubdomainOwner,
  requestSetSubdomainOwner, receiveSetSubdomainOwner
} from './actions';
import { rns as registryAddress } from '../../../config/contracts';
import { hash as namehash } from 'eth-ens-namehash';
import { keccak_256 as sha3 } from 'js-sha3';
import { notifyTx, notifyError } from '../../notifications';

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
      if (error) return resolve(dispatch(notifyError(error.message)));
      return resolve(dispatch(receiveDomainOwner(result)));
    });
  });
};

export const setDomainOwner = (domain, owner) => dispatch => {
  dispatch(requestSetOwner(domain, owner));

  const hash = namehash(domain);

  return new Promise((resolve) => {
    registry.setOwner(hash, owner, (error, result) => {
      dispatch(receiveSetOwner());
      if(error) return resolve(dispatch(notifyError(error.message)));
      return resolve(dispatch(notifyTx(result)));
    });
  });
};

export const getDomainResolver = domain => dispatch => {
  dispatch(requestDomainResolver(domain));

  const hash = namehash(domain);

  return new Promise(resolve => {
    registry.resolver(hash, (error, result) => {
      if(error) return resolve((receiveDomainResolver(error.message)));
      return resolve(dispatch(receiveDomainResolver(result)));
    });
  });
};

export const setDomainResolver = (domain, resolver) => dispatch => {
  dispatch(requestSetResolver(domain, resolver));

  const hash = namehash(domain);

  return new Promise((resolve) => {
    registry.setResolver(hash, resolver, (error, result) => {
      dispatch(receiveSetResolver());
      if(error) return resolve(dispatch(notifyError(error.message)));
      return resolve(dispatch(notifyTx(result)));
    });
  });
};

export const getDomainTtl = domain => dispatch => {
  dispatch(requestDomainTtl(domain));

  const hash = namehash(domain);

  return new Promise(resolve => {
    registry.ttl(hash, (error, result) => {
      if(error) return resolve(dispatch(notifyError(error.message)));
      return resolve(dispatch(receiveDomainTtl(result.toNumber())));
    });
  });
};

export const setDomainTtl = (domain, owner) => dispatch => {
  dispatch(requestSetTtl(domain, owner));

  const hash = namehash(domain);

  return new Promise((resolve) => {
    registry.setTTL(hash, owner, (error, result) => {
      dispatch(receiveSetTtl());
      if(error) return resolve(dispatch(notifyError(error.message)));
      return resolve(dispatch(notifyTx(result)));
    });
  });
};

export const addSubdomain = (domain, subdomain) => dispatch => {
  if(!subdomain) return;

  dispatch(addSubdomainAction(subdomain));

  const hash = namehash(`${subdomain}.${domain}`);

  return new Promise((resolve, reject) => {
    registry.owner(hash, (error, result) => {
      if(error) reject(dispatch(notifyError(error.message)));

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
      dispatch(receiveSetSubdomainOwner(child));
      if (error) return resolve(dispatch(notifyError(error.message)));
      return resolve(dispatch(notifyTx(result)));
    });
  });
};
