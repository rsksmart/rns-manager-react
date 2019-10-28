import { REQUEST_DOMAIN_STATE, RECEIVE_DOMAIN_STATE, BLOCKED_DOMAIN } from './types';

export const requestDomainState = () => ({
  type: REQUEST_DOMAIN_STATE,
});

export const receiveDomainState = available => ({
  type: RECEIVE_DOMAIN_STATE,
  owned: !available,
});

export const blockedDomain = () => ({
  type: BLOCKED_DOMAIN,
});
