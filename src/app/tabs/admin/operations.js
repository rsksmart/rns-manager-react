import {
  owner, resolver, ttl,
  addSubdomain as addSubdomainAction, receiveSubdomainOwner, clearSubdomains,
  requestSetSubdomainOwner, receiveSetSubdomainOwner
} from './actions';
import config from '../../../config/contracts';
import { hash as namehash } from 'eth-ens-namehash';
import { keccak_256 as sha3 } from 'js-sha3';
import { notifyTx, notifyError, txTypes, checkResolver } from '../../notifications';
import { get, set } from '../../factories/operationFactory';

const registry = window.web3 && window.web3.eth.contract([
  {
    'constant': true,
    'inputs': [
      { 'name': 'node', 'type': 'bytes32' }
    ],
    'name': 'owner',
    'outputs': [
      { 'name': '', 'type': 'address' }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      { 'name': 'node', 'type': 'bytes32' }
    ],
    'name': 'resolver',
    'outputs': [
      { 'name': '', 'type': 'address' }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      { 'name': 'node', 'type': 'bytes32' }
    ],
    'name': 'ttl',
    'outputs': [
      { 'name': '', 'type': 'uint64' }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      { 'name': 'node', 'type': 'bytes32' },
      { 'name': 'ownerAddress', 'type': 'address' }
    ],
    'name': 'setOwner',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      { 'name': 'node', 'type': 'bytes32' },
      { 'name': 'resolverAddress', 'type': 'address' }
    ],
    'name': 'setResolver',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      { 'name': 'node', 'type': 'bytes32' },
      { 'name': 'ttl', 'type': 'uint64' }
    ],
    'name': 'setTTL',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      { 'name': 'node', 'type': 'bytes32' },
      { 'name': 'label', 'type': 'bytes32' },
      { 'name': 'ownerAddress', 'type': 'address' }
    ],
    'name': 'setSubnodeOwner',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
]).at(config('app/tabs/admin/operations').registryAddress); // FIXME: This will not work if the page does not refresh

export const getDomainOwner = get(owner.requestGet, owner.receiveGet, registry && registry.owner);
export const getDomainResolver = get(resolver.requestGet, resolver.receiveGet, registry && registry.resolver);
export const getDomainTtl = get(ttl.requestGet, ttl.receiveGet, registry && registry.ttl);

export const setDomainOwner = set(owner.requestSet, owner.receiveSet, txTypes.SET_OWNER, registry && registry.setOwner, getDomainOwner);
export const setDomainResolver = set(resolver.requestSet, resolver.receiveSet, txTypes.SET_RESOLVER, registry && registry.setResolver,
  name => dispatch => {
    dispatch(getDomainResolver(name));
    dispatch(checkResolver(name))
  });
export const setDomainTtl = set(ttl.requestSet, ttl.receiveSet, txTypes.SET_TTL, registry && registry.setTTL, getDomainTtl);

export const loadSubdomains = domain => dispatch => {
  dispatch(clearSubdomains());
  const storedSubdomains = JSON.parse(localStorage.getItem('subdomains'));

  if (!storedSubdomains || !storedSubdomains[domain]) return;

  const subdomains = storedSubdomains[domain];

  for (let i in subdomains) {
    dispatch(addSubdomainAction(subdomains[i]));
    dispatch(displaySubdomain(domain, subdomains[i]));
  }
}

export const addSubdomain = (domain, subdomain) => dispatch => {
  if (!subdomain) return;

  dispatch(addSubdomainAction(subdomain));

  let storedSubdomains = JSON.parse(localStorage.getItem('subdomains'));
  if (!storedSubdomains) storedSubdomains = {};
  if (!storedSubdomains[domain]) storedSubdomains[domain] = [];
  storedSubdomains[domain].push(subdomain);
  localStorage.setItem('subdomains', JSON.stringify(storedSubdomains));

  return dispatch(displaySubdomain(domain, subdomain));
}

const displaySubdomain = (domain, subdomain) => dispatch => {
  const hash = namehash(`${subdomain}.${domain}`);

  return new Promise((resolve, reject) => {
    registry.owner(hash, (error, result) => {
      if (error) reject(dispatch(notifyError(error.message)));

      dispatch(receiveSubdomainOwner(subdomain, result));

      resolve(result);
    });
  });
}

export const setSubdomainOwner = (parent, child, owner) => dispatch => {
  dispatch(requestSetSubdomainOwner(child));

  const label = `0x${sha3(child)}`;
  const node = namehash(parent);

  return new Promise(resolve => {
    registry.setSubnodeOwner(node, label, owner, (error, result) => {
      dispatch(receiveSetSubdomainOwner(child));
      if (error) return resolve(dispatch(notifyError(error.message)));
      return resolve(dispatch(notifyTx(result, '', { type: txTypes.SET_SUBNOODE_OWNER, name: `${child}.${parent}`, owner }, () => displaySubdomain(parent, child))));
    });
  });
};
