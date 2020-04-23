import {
  REQUEST_DOMAIN_EXPIRATION_TIME, RECIEVE_DOMAIN_EXPIRATION_TIME,
  ERROR_DOMAIN_EXIPRATION_TIME, TOGGLE_RENEW_PANEL, REQUEST_TRANSFER_DOMAIN,
  RECEIVE_TRANSFER_DOMAIN, ERROR_TRANSFER_DOMAIN, HANDLE_TRANSFER_SUCCESS_CLOSE,
  REQUEST_RENEW_DOMAIN, RECEIVE_RENEW_DOMAIN, ERROR_RENEW_DOMAIN, CLOSE_RENEW_ERROR_MESSAGE,
  CLOSE_SUCCESS_ERROR_MESSAGE, HANDLE_TRANSFER_ERROR_CLOSE, REQUEST_FIFS_MIGRATION,
  RECEIVE_FIFS_MIGRATION, ERROR_FIFS_MIGRATION, RECEIVE_SET_DOMAIN_OWNER,
  REQUEST_SET_DOMAIN_OWNER, ERROR_SET_DOMAIN_OWNER, CLOSE_SET_DOMAIN_OWNER, REQUEST_RECLAIM_DOMAIN,
  ERROR_RECLAIM_DOMAIN,
} from './types';

const initialState = {
  checkingExpirationTime: false,
  expires: 0,
  isRenewOpen: false,
  requestingTransfer: false,
  isTransferSuccess: false,
  transferSuccessTx: '',
  errorMessage: '',
  isError: false,
  isRenewing: false,
  renewError: '',
  renewSuccess: false,
  renewSuccessTx: '',
  isMigrating: false,

  isSettingDomainOwner: false,
  domainOwnerSuccessTx: '',
  domainOwnerError: '',
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
      isTransferSuccess: true,
      transferSuccessTx: action.transferSuccessTx,
    };
    case ERROR_TRANSFER_DOMAIN: return {
      ...state,
      requestingTransfer: false,
      isError: true,
      errorMessage: action.errorMessage,
    };
    case HANDLE_TRANSFER_SUCCESS_CLOSE: return {
      ...state,
      isError: false,
      errorMessage: null,
      isTransferSuccess: false,
    };
    case HANDLE_TRANSFER_ERROR_CLOSE: return {
      ...state,
      isError: false,
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
      renewSuccess: true,
      renewSuccessTx: action.renewSuccessTx,
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
    case CLOSE_SUCCESS_ERROR_MESSAGE: return {
      ...state,
      renewSuccess: false,
    };

    case REQUEST_FIFS_MIGRATION: return {
      ...state,
      isMigrating: true,
    };
    case RECEIVE_FIFS_MIGRATION: return {
      ...state,
      isMigrating: false,
    };
    case ERROR_FIFS_MIGRATION: return {
      ...state,
      isMigrating: false,
    };

    case REQUEST_SET_DOMAIN_OWNER: return {
      ...state,
      isSettingDomainOwner: true,
    };
    case ERROR_SET_DOMAIN_OWNER: return {
      ...state,
      isSettingDomainOwner: false,
      domainOwnerError: action.message,
    };
    case RECEIVE_SET_DOMAIN_OWNER: return {
      ...state,
      isSettingDomainOwner: false,
      domainOwnerSuccessTx: action.successTx,
    };
    case CLOSE_SET_DOMAIN_OWNER: return {
      ...state,
      domainOwnerSuccessTx: '',
      domainOwnerError: '',
    };
    case REQUEST_RECLAIM_DOMAIN: return {
      ...state,
      isSettingDomainOwner: true,
    };
    case ERROR_RECLAIM_DOMAIN: return {
      ...state,
      isSettingDomainOwner: false,
      domainOwnerError: action.message,
    };

    default: return state;
  }
};

export default renewDomain;
