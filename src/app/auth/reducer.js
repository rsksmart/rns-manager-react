import { RECEIVE_HAS_METAMASK, REQUEST_ENABLE, RECEIVE_ENABLE, SHOW_AUTH_MODAL, CLOSE_AUTH_MODAL, REQUEST_LOGIN, RECEIVE_LOGIN, ERROR_LOGIN, ERROR_ENABLE } from './types';

const initialState = {
  showModal: false,
  hasMetamask: true,
  enabling: false,
  enableError: null,
  address: null,
  authenticating: false,
  authError: null,
  name: null,
  isOwner: false,
  network: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_AUTH_MODAL: return {
      ...state,
      defaultName: action.name,
      showModal: true
    }
    case CLOSE_AUTH_MODAL: return {
      ...state,
      showModal: false
    }
    case RECEIVE_HAS_METAMASK: return {
      ...state,
      hasMetamask: action.value
    }
    case REQUEST_ENABLE: return {
      ...state,
      enabling: true,
      enableError: null,
      address: null,
      network: null
    }
    case RECEIVE_ENABLE: return {
      ...state,
      enabling: false,
      enableError: null,
      address: action.address,
      network: action.network
    }
    case ERROR_ENABLE: return {
      ...state,
      enabling: false,
      enableError: action.message,
      address: null,
      network: null
    }
    case REQUEST_LOGIN: return {
      ...state,
      authenticating: true,
      authError: null,
      name: null
    }
    case RECEIVE_LOGIN: return {
      ...state,
      authenticating: false,
      authError: null,
      name: action.name,
      isOwner: action.isOwner,
      showModal: !action.isOwner
    }
    case ERROR_LOGIN: return {
      ...state,
      authenticating: false,
      authError: action.message,
      name: null
    }
    default: return state;
  }
};
