import {
  REQUEST_GET_ADDR, RECEIVE_GET_ADDR, CHANGE_EDIT_ADDR, REQUEST_SET_ADDR, RECEIVE_SET_ADDR,
  REQUEST_GET_CONTENT, RECEIVE_GET_CONTENT, CHANGE_EDIT_CONTENT, REQUEST_SET_CONTENT, RECEIVE_SET_CONTENT,
} from './types';

// addr
export const requestGetAddr = () => ({
  type: REQUEST_GET_ADDR,
});

export const receiveGetAddr = addr => ({
  type: RECEIVE_GET_ADDR,
  addr
});

export const changeViewAddr = () => ({
  type: CHANGE_EDIT_ADDR
});

export const requestSetAddr = () => ({
  type: REQUEST_SET_ADDR
});

export const receiveSetAddr = () => ({
  type: RECEIVE_SET_ADDR
});

// content
export const requestGetContent = () => ({
  type: REQUEST_GET_CONTENT,
});

export const receiveGetContent = content => ({
  type: RECEIVE_GET_CONTENT,
  content
});

export const changeViewContent = () => ({
  type: CHANGE_EDIT_CONTENT
});

export const requestSetContent = () => ({
  type: REQUEST_SET_CONTENT
});

export const receiveSetContent = () => ({
  type: RECEIVE_SET_CONTENT
});
