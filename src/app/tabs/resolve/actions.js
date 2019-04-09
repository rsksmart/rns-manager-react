import { REQUEST_RESOLVE, ERROR_RESOLVE, RECEIVE_RESOLVE } from "./types";

export const requestResolve = () => ({
  type: REQUEST_RESOLVE
});

export const receiveResolve = resolution => ({
  type: RECEIVE_RESOLVE,
  resolution
});

export const errorResolve = error => ({
  type: ERROR_RESOLVE,
  error
});
