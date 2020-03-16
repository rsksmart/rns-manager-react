import {
  REQUEST_NEW_SUBDOMAIN, RECEIVE_NEW_SUBDOMAIN, ERROR_NEW_SUBDOMAIN,
  ERROR_NEW_SUBDOMAIN_CLOSE, ADD_SUBDOMAIN_TO_LIST, CLEAR_SUBDOMAIN_LIST,
  SUCCESS_NEW_SUBDOMAIN_CLOSE, WAITING_NEW_SUBDOMAIN_CONFIRM,
} from './types';

export const requestNewSubdomain = () => ({
  type: REQUEST_NEW_SUBDOMAIN,
});

export const waitingNewSubdomainConfirm = () => ({
  type: WAITING_NEW_SUBDOMAIN_CONFIRM,
});

export const receiveNewSubdomain = confirmedTx => ({
  type: RECEIVE_NEW_SUBDOMAIN,
  confirmedTx,
});

export const errorNewSubdomain = message => ({
  type: ERROR_NEW_SUBDOMAIN,
  message,
});

export const errorNewSubdomainClose = () => ({
  type: ERROR_NEW_SUBDOMAIN_CLOSE,
});

export const successNewSubdomainClose = () => ({
  type: SUCCESS_NEW_SUBDOMAIN_CLOSE,
});

export const addSubdomainToList = (subdomain, owner) => ({
  type: ADD_SUBDOMAIN_TO_LIST,
  subdomain,
  owner,
});

export const clearSubdomainList = () => ({
  type: CLEAR_SUBDOMAIN_LIST,
});
