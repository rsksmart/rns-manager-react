import {
  OWNER, RESOLVER, TTL,
  ADD_SUBDOMAIN, RECEIVE_SUBDOMAIN_OWNER, CLEAR_SUBDOMAINS,
  VIEW_EDIT_SUBDOMAIN_OWNER, REQUEST_SET_SUBDOMAIN_OWNER, RECEIVE_SET_SUBDOMAIN_OWNER,
  REVERSE_REQUEST_GET, REVERSE_RECEIVE_GET,
  REVERSE_REQUEST_SET, REVERSE_RECEIVE_SET, REVERSE_ERROR_SET,
} from './types';

import filedActions from '../../factories/actionFactory';

export const owner = filedActions(OWNER);
export const resolver = filedActions(RESOLVER);
export const ttl = filedActions(TTL);

// subdomains
export const addSubdomain = label => ({
  type: ADD_SUBDOMAIN,
  label,
});

export const receiveSubdomainOwner = (label, subdomainOwner) => ({
  type: RECEIVE_SUBDOMAIN_OWNER,
  label,
  owner: subdomainOwner,
});

export const clearSubdomains = () => ({
  type: CLEAR_SUBDOMAINS,
});

// subdomain owners
export const viewEditSubdomainOwner = label => ({
  type: VIEW_EDIT_SUBDOMAIN_OWNER,
  label,
});

export const requestSetSubdomainOwner = label => ({
  type: REQUEST_SET_SUBDOMAIN_OWNER,
  label,
});

export const receiveSetSubdomainOwner = label => ({
  type: RECEIVE_SET_SUBDOMAIN_OWNER,
  label,
});

export const requestGetReverse = () => ({
  type: REVERSE_REQUEST_GET,
});

export const receiveGetReverse = reverseResolution => ({
  type: REVERSE_RECEIVE_GET,
  reverseResolution,
});

export const requestSetReverse = () => ({
  type: REVERSE_REQUEST_SET,
});

export const receiveSetReverse = () => ({
  type: REVERSE_RECEIVE_SET,
});

export const errorSetReverse = () => ({
  type: REVERSE_ERROR_SET,
});
