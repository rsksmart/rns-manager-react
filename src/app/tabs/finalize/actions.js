import { REQUEST_FINALIZE, RECEIVE_FINALIZE, ERROR_FINALIZE } from './types';

export const requestFinalize = () => ({
  type: REQUEST_FINALIZE
});

export const receiveFinalize = () => ({
  type: RECEIVE_FINALIZE
});
