import {
  SET_VIEW, REQUEST_TRANSFER_DOMAIN, RECEIVE_TRANSFER_DOMAIN, ERROR_TRANSFER_DOMAIN,
  HANDLE_ERROR_CLOSE, HANDLE_SUCCESS_CLOSE, CHECKSUM_ERROR,
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

export const checksumError = () => ({
  type: CHECKSUM_ERROR,
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
