import {
  REQUEST_DOMAIN_OWNER, RECEIVE_DOMAIN_OWNER, CHANGE_EDIT_OWNER, REQUEST_SET_OWNER, RECEIVE_SET_OWNER,
  REQUEST_DOMAIN_RESOLVER, RECEIVE_DOMAIN_RESOLVER, CHANGE_EDIT_RESOLVER, REQUEST_SET_RESOLVER, RECEIVE_SET_RESOLVER,
  REQUEST_DOMAIN_TTL, RECEIVE_DOMAIN_TTL, CHANGE_EDIT_TTL, REQUEST_SET_TTL, RECEIVE_SET_TTL,
  ADD_SUBDOMAIN, RECEIVE_SUBDOMAIN_OWNER,
  VIEW_EDIT_SUBDOMAIN_OWNER, REQUEST_SET_SUBDOMAIN_OWNER, RECEIVE_SET_SUBDOMAIN_OWNER
} from './types';

// owner
export const requestDomainOwner = () => ({
  type: REQUEST_DOMAIN_OWNER
});

export const receiveDomainOwner = owner => ({
  type: RECEIVE_DOMAIN_OWNER,
  owner
});

export const changeEditOwner = () => ({
  type: CHANGE_EDIT_OWNER
});

export const requestSetOwner = () => ({
  type: REQUEST_SET_OWNER
});

export const receiveSetOwner = () => ({
  type: RECEIVE_SET_OWNER
});

// resolver
export const requestDomainResolver = () => ({
  type: REQUEST_DOMAIN_RESOLVER
});

export const receiveDomainResolver = resolver => ({
  type: RECEIVE_DOMAIN_RESOLVER,
  resolver
});

export const changeEditResolver = () => ({
  type: CHANGE_EDIT_RESOLVER
});

export const requestSetResolver = () => ({
  type: REQUEST_SET_RESOLVER
});

export const receiveSetResolver = () => ({
  type: RECEIVE_SET_RESOLVER
});

// ttl
export const requestDomainTtl = () => ({
  type: REQUEST_DOMAIN_TTL
});

export const receiveDomainTtl = ttl => ({
  type: RECEIVE_DOMAIN_TTL,
  ttl
});

export const changeEditTtl = () => ({
  type: CHANGE_EDIT_TTL
});

export const requestSetTtl = () => ({
  type: REQUEST_SET_TTL,
});

export const receiveSetTtl = () => ({
  type: RECEIVE_SET_TTL,
});

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
