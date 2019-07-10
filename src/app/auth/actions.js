import * as types from './types';

export const showModal = name => ({
  type: types.SHOW_AUTH_MODAL,
  name,
});

export const closeModal = () => ({
  type: types.CLOSE_AUTH_MODAL,
});

export const receiveHasMetamask = value => ({
  type: types.RECEIVE_HAS_METAMASK,
  value,
});

export const requestEnable = () => ({
  type: types.REQUEST_ENABLE,
});

export const receiveEnable = (address, network) => ({
  type: types.RECEIVE_ENABLE,
  address,
  network,
});

export const errorEnable = message => ({
  type: types.ERROR_ENABLE,
  message,
});

export const requestLogin = () => ({
  type: types.REQUEST_LOGIN,
});

export const receiveLogin = (name, isOwner) => ({
  type: types.RECEIVE_LOGIN,
  name,
  isOwner,
});

export const errorLogin = message => ({
  type: types.ERROR_LOGIN,
  message,
});

export const logOut = () => ({
  type: types.LOG_OUT,
});
