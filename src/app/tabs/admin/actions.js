import {
  OWNER, RESOLVER, TTL,
  ADD_SUBDOMAIN, RECEIVE_SUBDOMAIN_OWNER,
  VIEW_EDIT_SUBDOMAIN_OWNER, REQUEST_SET_SUBDOMAIN_OWNER, RECEIVE_SET_SUBDOMAIN_OWNER
} from './types';

import { filedActions } from '../../factories/actionFactory';

export const owner = filedActions(OWNER);
export const resolver = filedActions(RESOLVER);
export const ttl = filedActions(TTL);

// subdomains
export const addSubdomain = label => ({
  type: ADD_SUBDOMAIN,
  label
});

export const receiveSubdomainOwner = (label, owner) => ({
  type: RECEIVE_SUBDOMAIN_OWNER,
  label,
  owner
});

// subdomain owners
export const viewEditSubdomainOwner = label => ({
  type: VIEW_EDIT_SUBDOMAIN_OWNER,
  label
});

export const requestSetSubdomainOwner = label => ({
  type: REQUEST_SET_SUBDOMAIN_OWNER,
  label
});

export const receiveSetSubdomainOwner = label => ({
  type: RECEIVE_SET_SUBDOMAIN_OWNER,
  label
});
