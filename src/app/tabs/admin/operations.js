import {
  requestDomainOwner, receiveDomainOwner, viewEditOwner, requestSetOwner, receiveSetOwner,
  requestDomainResolver, receiveDomainResolver,
  requestDomainTTL, receiveDomainTTL,
  addSubdomain as addSubdomainAction, receiveSubdomainOwner
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
  }
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

export const setDomainOwner = (domain, owner) => dispatch => {
  if(!domain || !owner) return;

  dispatch(requestSetOwner(domain, owner));

  const hash = namehash(domain);

  return new Promise((resolve, reject) => {
    registry.setOwner(hash, owner, (error, result) => {
      if(error) return reject(error);

      dispatch(receiveSetOwner(owner))
      dispatch(receiveDomainOwner(owner))
      dispatch(viewEditOwner())

      resolve(result);
    })
  })
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
