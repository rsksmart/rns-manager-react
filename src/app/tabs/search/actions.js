import {
  REQUEST_DOMAIN_STATE, RECEIVE_DOMAIN_STATE
} from './types';

export const requestDomainState = domain => ({
  type: REQUEST_DOMAIN_STATE,
  domain
});

export const receiveDomainState = state => ({
  type: RECEIVE_DOMAIN_STATE,
  state
});
