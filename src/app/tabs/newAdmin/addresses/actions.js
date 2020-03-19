import {
  REQUEST_SET_CHAIN_ADDRESS, ERROR_SET_CHAIN_ADDRESS, RECEIVE_SET_CHAIN_ADDRESS,
  WAITING_SET_CHAIN_ADDRESS, CLOSE_SET_CHAIN_ADDRESS,
} from './types';

export const requestSetChainAddress = () => ({
  type: REQUEST_SET_CHAIN_ADDRESS,
});

export const waitingSetChainAddress = () => ({
  type: WAITING_SET_CHAIN_ADDRESS,
});

export const receiveSetChainAddress = resultTx => ({
  type: RECEIVE_SET_CHAIN_ADDRESS,
  resultTx,
});

export const errorSetChainAddress = message => ({
  type: ERROR_SET_CHAIN_ADDRESS,
  message,
});

export const closeSetChainAddress = () => ({
  type: CLOSE_SET_CHAIN_ADDRESS,
});
