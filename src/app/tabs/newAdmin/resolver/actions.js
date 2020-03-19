import {
  REQUEST_RESOLVER, RECEIVE_RESOLVER,
} from './types';

export const requestResolver = () => ({
  type: REQUEST_RESOLVER,
});

export const receiveResolver = (resolverAddr, resolverName) => ({
  type: RECEIVE_RESOLVER,
  resolverAddr,
  resolverName,
});
