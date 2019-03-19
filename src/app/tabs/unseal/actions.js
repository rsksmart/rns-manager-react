import { REQUEST_UNSEAL, RECEIVE_UNSEAL } from './types';

export const requestUnseal = () => ({
  type: REQUEST_UNSEAL,
});

export const receiveUnseal = () => ({
  type: RECEIVE_UNSEAL,
});
