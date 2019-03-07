import {
  REQUEST_GET_ADDR, RECEIVE_GET_ADDR, ERROR_GET_ADDR, VIEW_EDIT_ADDR, REQUEST_SET_ADDR, RECEIVE_SET_ADDR, ERROR_SET_ADDR,
  REQUEST_GET_CONTENT, RECEIVE_GET_CONTENT, ERROR_GET_CONTENT, VIEW_EDIT_CONTENT, REQUEST_SET_CONTENT, RECEIVE_SET_CONTENT, ERROR_SET_CONTENT,
} from './types';

// addr
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

export const changeViewAddr = () => ({
  type: VIEW_EDIT_ADDR
});

export const requestSetAddr = () => ({
  type: REQUEST_SET_ADDR
});

export const receiveSetAddr = response => ({
  type: RECEIVE_SET_ADDR,
  response
});

export const errorSetAddr = error => ({
  type: ERROR_SET_ADDR,
  error
});

// content
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

export const changeViewContent = () => ({
  type: VIEW_EDIT_CONTENT
});

export const requestSetContent = () => ({
  type: REQUEST_SET_CONTENT
});

export const receiveSetContent = response => ({
  type: RECEIVE_SET_CONTENT,
  response
});

export const errorSetContent = error => ({
  type: ERROR_SET_CONTENT,
  error
});
