import {
  REQUEST_UNSEAL, RECEIVE_UNSEAL, ERROR_UNSEAL
} from './types';

export const requestUnseal = () => ({
  type: REQUEST_UNSEAL,
});

export const receiveUnseal = response => ({
  type: RECEIVE_UNSEAL,
  response
});

export const errorUnseal = error => ({
  type: ERROR_UNSEAL,
  error
});
