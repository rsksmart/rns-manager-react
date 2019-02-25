import { REQUEST_RESOLVE_ADDRESS, RECEIVE_RESOLVE_ADDRESS } from './types';

export const requestResolveAddress = domain => ({
  type: REQUEST_RESOLVE_ADDRESS,
  domain
});

export const receiveResolveAddress = address => ({
  type: RECEIVE_RESOLVE_ADDRESS,
  address
});
