import {
  RENEW_DOMAIN_CHECK_SUBDOMAIN, REQUEST_DOMAIN_EXPIRATION_TIME, RECIEVE_DOMAIN_EXPIRATION_TIME,
  ERROR_DOMAIN_EXIPRATION_TIME, TOGGLE_RENEW_PANEL, REQUEST_TRANSFER_DOMAIN,
  RECEIVE_TRANSFER_DOMAIN, ERROR_TRANSFER_DOMAIN, HANDLE_ERROR_CLOSE, HANDLE_SUCCESS_CLOSE,
  REQUEST_RENEW_DOMAIN, RECEIVE_RENEW_DOMAIN, ERROR_RENEW_DOMAIN, CLOSE_RENEW_ERROR_MESSAGE,
} from './types';

const initialState = {
  isSubdomain: false,
  remaining: 0,
  checkingExpirationTime: false,
  isRenewOpen: false,
  requestingTransfer: false,
  errorMessage: '',
  isError: false,
  isRenewing: false,
  renewError: '',
};

const renewDomain = (state = initialState, action) => {
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
      isRenewOpen: action.isOpen,
    };

    case REQUEST_RENEW_DOMAIN: return {
      ...state,
      isRenewing: true,
    };
    case RECEIVE_RENEW_DOMAIN: return {
      ...state,
      isRenewing: false,
      isRenewOpen: false,
    };
    case ERROR_RENEW_DOMAIN: return {
      ...state,
      renewError: action.message,
      isRenewing: false,
    };
    case CLOSE_RENEW_ERROR_MESSAGE: return {
      ...state,
      renewError: '',
    };
    default: return state;
  }
};

export default renewDomain;
