import {
  REQUEST_NEW_SUBDOMAIN, RECEIVE_NEW_SUBDOMAIN, ERROR_NEW_SUBDOMAIN,
  ERROR_NEW_SUBDOMAIN_CLOSE, ADD_SUBDOMAIN_TO_LIST, CLEAR_SUBDOMAIN_LIST,
  SUCCESS_NEW_SUBDOMAIN_CLOSE, WAITING_NEW_SUBDOMAIN_CONFIRM,
} from './types';

const initialState = {
  subdomains: [],
  newRequesting: false,
  newWaiting: false,
  confirmedTx: '',
  newError: '',
};

const subdomainReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_NEW_SUBDOMAIN: return {
      ...state,
      newRequesting: true,
    };
    case WAITING_NEW_SUBDOMAIN_CONFIRM: return {
      ...state,
      newWaiting: true,
    };
    case RECEIVE_NEW_SUBDOMAIN: return {
      ...state,
      newRequesting: false,
      newWaiting: false,
      confirmedTx: action.confirmedTx,
    };
    case ERROR_NEW_SUBDOMAIN: return {
      ...state,
      newError: action.message,
      newRequesting: false,
      newWaiting: false,
    };
    case ERROR_NEW_SUBDOMAIN_CLOSE: return {
      ...state,
      newError: '',
    };
    case SUCCESS_NEW_SUBDOMAIN_CLOSE: return {
      ...state,
      confirmedTx: '',
    };

    case CLEAR_SUBDOMAIN_LIST: return {
      ...state,
      subdomains: [],
    };
    case ADD_SUBDOMAIN_TO_LIST: return {
      ...state,
      subdomains: [
        ...state.subdomains,
        {
          name: action.subdomain,
          owner: action.owner,
        },
      ],
    };
    default: return state;
  }
};

export default subdomainReducer;
