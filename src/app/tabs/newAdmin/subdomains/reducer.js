import {
  REQUEST_NEW_SUBDOMAIN, RECEIVE_NEW_SUBDOMAIN, ERROR_NEW_SUBDOMAIN,
  ERROR_NEW_SUBDOMAIN_CLOSE, ADD_SUBDOMAIN_TO_LIST, CLEAR_SUBDOMAIN_LIST,
} from './types';

const initialState = {
  subdomains: [],
  newRequesting: false,
  newConfirmed: false,
  newError: '',
};

const subdomainReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_NEW_SUBDOMAIN: return {
      ...state,
      newRequesting: true,
    };
    case RECEIVE_NEW_SUBDOMAIN: return {
      ...state,
      newRequesting: false,
      newConfirmed: action.confirmed,
    };
    case ERROR_NEW_SUBDOMAIN: return {
      ...state,
      newError: action.message,
    };
    case ERROR_NEW_SUBDOMAIN_CLOSE: return {
      ...state,
      newError: '',
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
