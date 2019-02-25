import {
  REQUEST_RESOLVE_ADDRESS, RECEIVE_RESOLVE_ADDRESS,
  REQUEST_DOMAIN_STATE, RECEIVE_DOMAIN_STATE
} from './types';

export const requestResolveAddress = domain => ({
  type: REQUEST_RESOLVE_ADDRESS,
  domain
});

export const receiveResolveAddress = address => ({
  type: RECEIVE_RESOLVE_ADDRESS,
  address
});

export const requestDomainState = domain => ({
  type: REQUEST_DOMAIN_STATE,
  domain
});

export const receiveDomainState = state => ({
  type: RECEIVE_DOMAIN_STATE,
  state
});
