import {
  REQUEST_DOMAIN_OWNER, RECEIVE_DOMAIN_OWNER
} from './types';

export const requestDomainOwner = domain => ({
  type: REQUEST_DOMAIN_OWNER,
  domain
});

export const receiveDomainOwner = owner => ({
  type: RECEIVE_DOMAIN_OWNER,
  owner
});
