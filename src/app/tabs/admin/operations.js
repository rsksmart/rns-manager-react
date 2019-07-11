import { hash as namehash } from 'eth-ens-namehash';
import { keccak_256 as sha3 } from 'js-sha3';
import {
  owner, resolver, ttl,
  addSubdomain as addSubdomainAction, receiveSubdomainOwner, clearSubdomains,
  requestSetSubdomainOwner, receiveSetSubdomainOwner,
} from './actions';
import { rns as registryAddress } from '../../../config/contracts';
import {
  notifyTx, notifyError, txTypes, checkResolver,
} from '../../notifications';
import { get, set } from '../../factories/operationFactory';
import abi from './abi';

const registry = window.web3 && window.web3.eth.contract(abi).at(registryAddress);

export const getDomainOwner = get(owner.requestGet, owner.receiveGet, registry && registry.owner);
export const getDomainResolver = get(
  resolver.requestGet,
  resolver.receiveGet,
  registry && registry.resolver,
);
export const getDomainTtl = get(ttl.requestGet, ttl.receiveGet, registry && registry.ttl);

export const setDomainOwner = set(
  owner.requestSet,
  owner.receiveSet,
  txTypes.SET_OWNER,
  registry && registry.setOwner,
  getDomainOwner,
);
export const setDomainResolver = set(
  resolver.requestSet,
  resolver.receiveSet,
  txTypes.SET_RESOLVER,
  registry && registry.setResolver,
  name => (dispatch) => {
    dispatch(getDomainResolver(name));
    dispatch(checkResolver(name));
  },
);
export const setDomainTtl = set(
  ttl.requestSet,
  ttl.receiveSet,
  txTypes.SET_TTL,
  registry && registry.setTTL,
  getDomainTtl,
);

const displaySubdomain = (domain, subdomain) => (dispatch) => {
  const hash = namehash(`${subdomain}.${domain}`);

  return new Promise((resolve, reject) => {
    registry.owner(hash, (error, result) => {
      if (error) reject(dispatch(notifyError(error.message)));

      dispatch(receiveSubdomainOwner(subdomain, result));

      resolve(result);
    });
  });
};

export const loadSubdomains = domain => (dispatch) => {
  dispatch(clearSubdomains());
  const storedSubdomains = JSON.parse(localStorage.getItem('subdomains'));

  if (!storedSubdomains || !storedSubdomains[domain]) return;

  const subdomains = storedSubdomains[domain];

  for (let i = 0; i < subdomains.length; i += 1) {
    dispatch(addSubdomainAction(subdomains[i]));
    dispatch(displaySubdomain(domain, subdomains[i]));
  }
};

export const addSubdomain = (domain, subdomain) => (dispatch) => {
  if (!subdomain) return;

  dispatch(addSubdomainAction(subdomain));

  let storedSubdomains = JSON.parse(localStorage.getItem('subdomains'));
  if (!storedSubdomains) storedSubdomains = {};
  if (!storedSubdomains[domain]) storedSubdomains[domain] = [];
  storedSubdomains[domain].push(subdomain);
  localStorage.setItem('subdomains', JSON.stringify(storedSubdomains));

  dispatch(displaySubdomain(domain, subdomain));
};

export const setSubdomainOwner = (parent, child, _owner) => (dispatch) => {
  dispatch(requestSetSubdomainOwner(child));

  const label = `0x${sha3(child)}`;
  const node = namehash(parent);

  return new Promise((resolve) => {
    registry.setSubnodeOwner(node, label, _owner, (error, result) => {
      dispatch(receiveSetSubdomainOwner(child));
      if (error) return resolve(dispatch(notifyError(error.message)));
      return resolve(dispatch(notifyTx(result, '', { type: txTypes.SET_SUBNODE_OWNER, name: `${child}.${parent}`, owner }, () => displaySubdomain(parent, child))));
    });
  });
};
