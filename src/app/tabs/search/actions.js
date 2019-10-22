import { REQUEST_DOMAIN_STATE, RECEIVE_DOMAIN_STATE, BLOCKED_DOMAIN } from './types';

export const requestDomainState = () => ({
  type: REQUEST_DOMAIN_STATE,
});

export const receiveDomainState = owned => ({
  type: RECEIVE_DOMAIN_STATE,
  owned,
});

export const blockedDomain = () => ({
  type: BLOCKED_DOMAIN,
});
