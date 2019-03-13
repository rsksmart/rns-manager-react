import {
  REQUEST_ENABLE, RECEIVE_ENABLE, ERROR_ENABLE,
  DISPLAY_AUTH_MODAL,
  REQUEST_AUTH_DOMAIN, RECEIVE_AUTH_DOMAIN, ERROR_AUTH_DOMAIN
} from './types';

export const requestEnable = () => ({
  type: REQUEST_ENABLE
});

export const receiveEnable = response => ({
  type: RECEIVE_ENABLE,
  response
});

export const errorEnable = error => ({
  type: ERROR_ENABLE,
  error
});

export const displayAuthModal = () => ({
  type: DISPLAY_AUTH_MODAL
});

export const requestAuthDomain = () => ({
  type: REQUEST_AUTH_DOMAIN
});

export const receiveAuthDomain = response => ({
  type: RECEIVE_AUTH_DOMAIN,
  response
});

export const errorAuthDomain = error => ({
  type: ERROR_AUTH_DOMAIN,
  error
});
