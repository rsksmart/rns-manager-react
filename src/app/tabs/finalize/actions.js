import { REQUEST_FINALIZE, RECEIVE_FINALIZE, ERROR_FINALIZE } from './types';

export const requestFinalize = () => ({
  type: REQUEST_FINALIZE
});

export const receiveFinalize = response => ({
  type: RECEIVE_FINALIZE,
  response
});
