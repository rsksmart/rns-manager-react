import {
  REQUEST_DOMAIN_OWNER, RECEIVE_DOMAIN_OWNER, VIEW_EDIT_OWNER, REQUEST_SET_OWNER, RECEIVE_SET_OWNER,
  REQUEST_DOMAIN_RESOLVER, RECEIVE_DOMAIN_RESOLVER,
  REQUEST_DOMAIN_TTL, RECEIVE_DOMAIN_TTL,
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

export const viewEditOwner = () => ({
  type: VIEW_EDIT_OWNER
});

export const requestSetOwner = (domain, owner) => ({
  type: REQUEST_SET_OWNER,
  domain,
  owner
});

export const receiveSetOwner = (owner) => ({
  type: RECEIVE_SET_OWNER,
  owner
})

// resolver
export const requestDomainResolver = domain => ({
  type: REQUEST_DOMAIN_RESOLVER,
  domain
});

export const receiveDomainResolver = resolver => ({
  type: RECEIVE_DOMAIN_RESOLVER,
  resolver
});

// ttl
export const requestDomainTTL = domain => ({
  type: REQUEST_DOMAIN_TTL,
  domain
});

export const receiveDomainTTL = ttl => ({
  type: RECEIVE_DOMAIN_TTL,
  ttl
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
