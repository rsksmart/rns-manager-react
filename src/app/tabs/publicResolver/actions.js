import {
  REQUEST_GET_ADDR, RECEIVE_GET_ADDR, ERROR_GET_ADDR,
  REQUEST_GET_CONTENT, RECEIVE_GET_CONTENT, ERROR_GET_CONTENT
} from './types';

export const requestGetAddr = () => ({
  type: REQUEST_GET_ADDR,
});

export const receiveGetAddr = addr => ({
  type: RECEIVE_GET_ADDR,
  addr
});

export const errorGetAddr = error => ({
  type: ERROR_GET_ADDR,
  error
});

export const requestGetContent = () => ({
  type: REQUEST_GET_CONTENT,
});

export const receiveGetContent = content => ({
  type: RECEIVE_GET_CONTENT,
  content
});

export const errorGetContent = error => ({
  type: ERROR_GET_CONTENT,
  error
});
