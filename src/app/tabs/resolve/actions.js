import { REQUEST_RESOLVE, ERROR_RESOLVE, RECEIVE_RESOLVE, REQUEST_CHAIN_RESOLVE, ERROR_CHAIN_RESOLVE, RECEIVE_CHAIN_RESOLVE } from "./types";

export const requestResolve = () => ({
  type: REQUEST_RESOLVE
});

export const receiveResolve = (resolution, resolverAddress, supportsChainAddr) => ({
  type: RECEIVE_RESOLVE,
  resolution,
  resolverAddress,
  supportsChainAddr
});

export const errorResolve = error => ({
  type: ERROR_RESOLVE,
  error
});

export const requestChainResolve = () => ({
  type: REQUEST_CHAIN_RESOLVE
});

export const receiveChainResolve = chainAddr => ({
  type: RECEIVE_CHAIN_RESOLVE,
  chainAddr
});

export const errorChainResolve = error => ({
  type: ERROR_CHAIN_RESOLVE,
  error
});
