import {
  requestGetOwner, receiveGetOwner, requestSetOwner, receiveSetOwner,
  requestGetResolver, receiveGetResolver, requestSetResolver, receiveSetResolver,
  requestGetTtl, receiveGetTtl, requestSetTtl, receiveSetTtl,
  addSubdomain as addSubdomainAction, receiveSubdomainOwner,
  requestSetSubdomainOwner, receiveSetSubdomainOwner
} from './actions';
import { rns as registryAddress } from '../../../config/contracts';
import { hash as namehash } from 'eth-ens-namehash';
import { keccak_256 as sha3 } from 'js-sha3';
import { notifyTx, notifyError, txTypes } from '../../notifications';

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
]).at(registryAddress);

const get = (request, receive, action) => name => dispatch => {
  dispatch(request(name));

  const hash = namehash(name);

  return new Promise(resolve => {
    action(hash, (error, result) => {
      if (error) return resolve(dispatch(notifyError(error.message)));
      return resolve(dispatch(receive(result)));
    });
  });
};

const set = (request, receive, txType, action) => (name, value) => dispatch => {
  dispatch(request(name, value));

  const hash = namehash(name);

  return new Promise((resolve) => {
    action(hash, value, (error, result) => {
      dispatch(receive());
      if (error) return resolve(dispatch(notifyError(error.message)));
      return resolve(dispatch(notifyTx(result, '', { type: txType, name, value })));
    });
  });
};

export const getDomainOwner = get(requestGetOwner, receiveGetOwner, registry.owner);
export const getDomainResolver = get(requestGetResolver, receiveGetResolver, registry.resolver);
export const getDomainTtl = get(requestGetTtl, receiveGetTtl, registry.ttl);

export const setDomainOwner = set(requestSetOwner, receiveSetOwner, txTypes.SET_OWNER, registry.setOwner);
export const setDomainResolver = set(requestSetResolver, receiveSetResolver, txTypes.SET_RESOLVER, registry.setResolver);
export const setDomainTtl = set(requestSetTtl, receiveSetTtl, txTypes.SET_TTL, registry.setTTL);

export const addSubdomain = (domain, subdomain) => dispatch => {
  if (!subdomain) return;

  dispatch(addSubdomainAction(subdomain));

  const hash = namehash(`${subdomain}.${domain}`);

  return new Promise((resolve, reject) => {
    registry.owner(hash, (error, result) => {
      if (error) reject(dispatch(notifyError(error.message)));

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
      return resolve(dispatch(notifyTx(result, '', { type: txTypes.SET_SUBNOODE_OWNER, parent, child, owner })));
    });
  });
};
