import {
  REQUEST_REVERSE_RESOLVER, RECEIVE_REVERSE_RESOLVER,
} from './types';

export const requestResolver = () => ({
  type: REQUEST_REVERSE_RESOLVER,
});

export const receiveResolver = value => ({
  type: RECEIVE_REVERSE_RESOLVER,
  value,
});
