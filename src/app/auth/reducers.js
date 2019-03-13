import {
  REQUEST_ENABLE, RECEIVE_ENABLE, ERROR_ENABLE,
  DISPLAY_AUTH_MODAL,
  REQUEST_AUTH_DOMAIN, RECEIVE_AUTH_DOMAIN, ERROR_AUTH_DOMAIN
} from './types';

const initialState = {
  enabling: false,
  address: null,
  errorEnabling: null,
  displayAuthModal: false,
  authenticating: false,
  domain: null,
  errorAuth: null
};

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case REQUEST_ENABLE: return {
      ...state,
      enabling: true,
      address: null,
      domain: null
    }
    case RECEIVE_ENABLE: return {
      ...state,
      enabling: false,
      address: action.response[0],
      errorEnabling: null
    }
    case ERROR_ENABLE: return {
      ...state,
      enabling: false,
      address: null,
      errorEnabling: action.error.message
    }
    case DISPLAY_AUTH_MODAL: return {
      ...state,
      displayAuthModal: !state.displayAuthModal
    }
    case REQUEST_AUTH_DOMAIN: return {
      ...state,
      authenticating: true,
      domain: null,
      errorAuth: null
    }
    case RECEIVE_AUTH_DOMAIN: return {
      ...state,
      authenticating: false,
      domain: action.response,
      errorAuth: null
    }
    case ERROR_AUTH_DOMAIN: return {
      ...state,
      authenticating: false,
      domain: null,
      errorAuth: action.error
    }
    default: return state
  }
};

export default authReducer;

