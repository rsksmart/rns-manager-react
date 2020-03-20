import {
  REQUEST_SET_CHAIN_ADDRESS, ERROR_SET_CHAIN_ADDRESS, RECEIVE_SET_CHAIN_ADDRESS,
  WAITING_SET_CHAIN_ADDRESS, CLOSE_SET_CHAIN_ADDRESS, REQUEST_CHAIN_ADDRESS,
  RECEIVE_CHAIN_ADDRESS, ERROR_CHAIN_ADDRESS,
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

export const requestChainAddress = () => ({
  type: REQUEST_CHAIN_ADDRESS,
});

export const receiveChainAddress = (chainId, chainName, address) => ({
  type: RECEIVE_CHAIN_ADDRESS,
  chainId,
  chainName,
  address,
});

export const errorChainAddress = message => ({
  type: ERROR_CHAIN_ADDRESS,
  message,
});
