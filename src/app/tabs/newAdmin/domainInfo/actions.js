import {
  REQUEST_TRANSFER_DOMAIN, RECEIVE_TRANSFER_DOMAIN, ERROR_TRANSFER_DOMAIN, HANDLE_ERROR_CLOSE,
  HANDLE_SUCCESS_CLOSE, RENEW_DOMAIN_CHECK_SUBDOMAIN, REQUEST_DOMAIN_EXPIRATION_TIME,
  RECIEVE_DOMAIN_EXPIRATION_TIME, ERROR_DOMAIN_EXIPRATION_TIME, TOGGLE_RENEW_PANEL,
  REQUEST_RENEW_DOMAIN, RECEIVE_RENEW_DOMAIN, ERROR_RENEW_DOMAIN, CLOSE_RENEW_ERROR_MESSAGE,
  CLOSE_SUCCESS_ERROR_MESSAGE,
} from './types';

export const requestTransferDomain = () => ({
  type: REQUEST_TRANSFER_DOMAIN,
});

export const receiveTransferDomain = () => ({
  type: RECEIVE_TRANSFER_DOMAIN,
});

export const errorTransferDomain = message => ({
  type: ERROR_TRANSFER_DOMAIN,
  errorMessage: message,
});

export const handleErrorClose = () => ({
  type: HANDLE_ERROR_CLOSE,
});

export const handleSuccessClose = () => ({
  type: HANDLE_SUCCESS_CLOSE,
});

export const renewDomainIsSubdomain = isSubdomain => ({
  type: RENEW_DOMAIN_CHECK_SUBDOMAIN,
  isSubdomain,
});

export const requestDomainExpirationTime = () => ({
  type: REQUEST_DOMAIN_EXPIRATION_TIME,
});

export const receiveDomainExpirationTime = remaining => ({
  type: RECIEVE_DOMAIN_EXPIRATION_TIME,
  remaining,
});

export const errorDomainExpirationTime = () => ({
  type: ERROR_DOMAIN_EXIPRATION_TIME,
});

export const toggleRenew = isRenewOpen => ({
  type: TOGGLE_RENEW_PANEL,
  isOpen: !isRenewOpen,
});

export const requestRenewDomain = () => ({
  type: REQUEST_RENEW_DOMAIN,
});

export const receiveRenewDomain = tx => ({
  type: RECEIVE_RENEW_DOMAIN,
  renewSuccessTx: tx,
});

export const errorRenewDomain = message => ({
  type: ERROR_RENEW_DOMAIN,
  message,
});

export const closeRenewError = () => ({
  type: CLOSE_RENEW_ERROR_MESSAGE,
});

export const closeRenewSuccess = () => ({
  type:CLOSE_SUCCESS_ERROR_MESSAGE,
});
