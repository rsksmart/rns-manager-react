import { combineReducers } from 'redux';

import {
  SET_VIEW, REQUEST_TRANSFER_DOMAIN, RECEIVE_TRANSFER_DOMAIN, ERROR_TRANSFER_DOMAIN,
  HANDLE_ERROR_CLOSE, HANDLE_SUCCESS_CLOSE, CHECKSUM_ERROR,
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
  isChecksumError: false,
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
    case CHECKSUM_ERROR: return {
      ...state,
      isChecksumError: true,
    };
    default: return state;
  }
};

export default combineReducers({
  view: adminReducer,
  transfer: transferDomainReducer,
});
