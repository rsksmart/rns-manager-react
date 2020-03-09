import {
  SET_VIEW, REQUEST_TRANSFER_DOMAIN, RECEIVE_TRANSFER_DOMAIN, ERROR_TRANSFER_DOMAIN,
  HANDLE_ERROR_CLOSE, HANDLE_SUCCESS_CLOSE, RENEW_DOMAIN_CHECK_SUBDOMAIN,
  REQUEST_DOMAIN_EXPIRATION_TIME, RECIEVE_DOMAIN_EXPIRATION_TIME, ERROR_DOMAIN_EXIPRATION_TIME,
  TOGGLE_RENEW_PANEL,
} from './types';

export const toggleBasicAdvanced = showAdvancedView => ({
  type: SET_VIEW,
  advancedView: showAdvancedView,
});

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
