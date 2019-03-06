import {
  REQUEST_DOMAIN_OWNER, RECEIVE_DOMAIN_OWNER, CHANGE_EDIT_OWNER, REQUEST_SET_OWNER, RECEIVE_SET_OWNER, ERROR_SET_OWNER,
  REQUEST_DOMAIN_RESOLVER, RECEIVE_DOMAIN_RESOLVER, CHANGE_EDIT_RESOLVER, REQUEST_SET_RESOLVER, RECEIVE_SET_RESOLVER, ERROR_SET_RESOLVER,
  REQUEST_DOMAIN_TTL, RECEIVE_DOMAIN_TTL, CHANGE_EDIT_TTL, REQUEST_SET_TTL, RECEIVE_SET_TTL, ERROR_SET_TTL,
  ADD_SUBDOMAIN, RECEIVE_SUBDOMAIN_OWNER,
} from './types';

// owner
export const requestDomainOwner = domain => ({
  type: REQUEST_DOMAIN_OWNER,
  domain
});

export const receiveDomainOwner = owner => ({
  type: RECEIVE_DOMAIN_OWNER,
  owner
});

export const changeEditOwner = () => ({
  type: CHANGE_EDIT_OWNER
});

export const requestSetOwner = (domain, owner) => ({
  type: REQUEST_SET_OWNER,
  domain,
  owner
});

export const receiveSetOwner = response => ({
  type: RECEIVE_SET_OWNER,
  response
});

export const errorSetOwner = error => ({
  type: ERROR_SET_OWNER,
  error
});

// resolver
export const requestDomainResolver = domain => ({
  type: REQUEST_DOMAIN_RESOLVER,
  domain
});

export const receiveDomainResolver = resolver => ({
  type: RECEIVE_DOMAIN_RESOLVER,
  resolver
});

export const changeEditResolver = () => ({
  type: CHANGE_EDIT_RESOLVER
});

export const requestSetResolver = (domain, resolver) => ({
  type: REQUEST_SET_RESOLVER,
  domain,
  resolver
});

export const receiveSetResolver = response => ({
  type: RECEIVE_SET_RESOLVER,
  response
});

export const errorSetResolver = error => ({
  type: ERROR_SET_RESOLVER,
  error
});

// ttl
export const requestDomainTtl = domain => ({
  type: REQUEST_DOMAIN_TTL,
  domain
});

export const receiveDomainTtl = ttl => ({
  type: RECEIVE_DOMAIN_TTL,
  ttl
});

export const changeEditTtl = () => ({
  type: CHANGE_EDIT_TTL
});

export const requestSetTtl = (domain, ttl) => ({
  type: REQUEST_SET_TTL,
  domain,
  ttl
});

export const receiveSetTtl = response => ({
  type: RECEIVE_SET_TTL,
  response
});

export const errorSetTtl = error => ({
  type: ERROR_SET_TTL,
  error
});

// subdomains
export const addSubdomain = subdomain => ({
  type: ADD_SUBDOMAIN,
  subdomain
});

export const receiveSubdomainOwner = (label, owner) => ({
  type: RECEIVE_SUBDOMAIN_OWNER,
  label,
  owner
});
