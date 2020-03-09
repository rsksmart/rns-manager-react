import { combineReducers } from 'redux';

import {
  SET_VIEW, REQUEST_TRANSFER_DOMAIN, RECEIVE_TRANSFER_DOMAIN, ERROR_TRANSFER_DOMAIN,
  HANDLE_ERROR_CLOSE, HANDLE_SUCCESS_CLOSE, RENEW_DOMAIN_CHECK_SUBDOMAIN,
  REQUEST_DOMAIN_EXPIRATION_TIME, RECIEVE_DOMAIN_EXPIRATION_TIME, ERROR_DOMAIN_EXIPRATION_TIME,
  TOGGLE_RENEW_PANEL,
} from './types';

const adminReducerInitialState = {
  advancedView: false,
};

const adminReducer = (state = adminReducerInitialState, action) => {
  switch (action.type) {
    case SET_VIEW: return {
      ...state,
      advancedView: action.advancedView,
    };
    default: return state;
  }
};

const transferDomainInitialState = {
  requestingTransfer: false,
  errorMessage: '',
  isError: false,
};

const transferDomainReducer = (state = transferDomainInitialState, action) => {
  switch (action.type) {
    case REQUEST_TRANSFER_DOMAIN: return {
      ...state,
      requestingTransfer: true,
    };
    case RECEIVE_TRANSFER_DOMAIN: return {
      ...state,
      requestingTransfer: false,
      isSuccess: true,
    };
    case ERROR_TRANSFER_DOMAIN: return {
      ...state,
      requestingTransfer: false,
      isError: true,
      errorMessage: action.errorMessage,
    };
    case HANDLE_ERROR_CLOSE: return {
      ...state,
      isError: false,
      errorMessage: null,
    };
    case HANDLE_SUCCESS_CLOSE: return {
      ...state,
      isSuccess: false,
    };
    default: return state;
  }
};

const renewDomainInitialState = {
  isSubdomain: false,
  remaining: 0,
  checkingExpirationTime: false,
  isRenewOpen: false,
};

const renewDomain = (state = renewDomainInitialState, action) => {
  switch (action.type) {
    case RENEW_DOMAIN_CHECK_SUBDOMAIN: return {
      ...state,
      isSubdomain: action.isSubdomain,
    };
    case REQUEST_DOMAIN_EXPIRATION_TIME: return {
      ...state,
      checkingExpirationTime: true,
    };
    case RECIEVE_DOMAIN_EXPIRATION_TIME: return {
      ...state,
      checkingExpirationTime: false,
      expires: action.remaining,
    };
    case ERROR_DOMAIN_EXIPRATION_TIME: return {
      ...state,
      checkingExpirationTime: false,
    };
    case TOGGLE_RENEW_PANEL: return {
      ...state,
      isRenewOpen: action.isOpen
    }
    default: return state;
  }
};

export default combineReducers({
  view: adminReducer,
  transfer: transferDomainReducer,
  renew: renewDomain,
});
