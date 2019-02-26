import {
  ADMIN_DOMAIN,
  REQUEST_DOMAIN_OWNER, RECEIVE_DOMAIN_OWNER,
  REQUEST_DOMAIN_RESOLVER, RECEIVE_DOMAIN_RESOLVER,
  REQUEST_DOMAIN_TTL, RECEIVE_DOMAIN_TTL,
  ADD_SUBDOMAIN
} from './types';

export const adminDomain = domain => ({
  type: ADMIN_DOMAIN,
  domain
});

export const requestDomainOwner = domain => ({
  type: REQUEST_DOMAIN_OWNER,
  domain
});

export const receiveDomainOwner = owner => ({
  type: RECEIVE_DOMAIN_OWNER,
  owner
});

export const requestDomainResolver = domain => ({
  type: REQUEST_DOMAIN_RESOLVER,
  domain
});

export const receiveDomainResolver = resolver => ({
  type: RECEIVE_DOMAIN_RESOLVER,
  resolver
});

export const requestDomainTTL = domain => ({
  type: REQUEST_DOMAIN_TTL,
  domain
});

export const receiveDomainTTL = ttl => ({
  type: RECEIVE_DOMAIN_TTL,
  ttl
});

export const addSubdomain = subdomain => ({
  type: ADD_SUBDOMAIN,
  subdomain
});
