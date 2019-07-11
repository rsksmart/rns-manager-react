import { REQUEST_DOMAIN_STATE, RECEIVE_DOMAIN_STATE } from './types';

export const requestDomainState = () => ({
  type: REQUEST_DOMAIN_STATE,
});

export const receiveDomainState = state => ({
  type: RECEIVE_DOMAIN_STATE,
  state,
});
