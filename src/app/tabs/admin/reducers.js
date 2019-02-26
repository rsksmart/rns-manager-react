import {
  REQUEST_DOMAIN_OWNER, RECEIVE_DOMAIN_OWNER,
  REQUEST_DOMAIN_RESOLVER, RECEIVE_DOMAIN_RESOLVER
} from './types';

const initialState = {
  owner: '',
  ownerLoading: false,
  resolver: '',
  resolverLoading: false
};

const adminReducer = (state = initialState, action) => {
  switch(action.type) {
    case REQUEST_DOMAIN_OWNER: {
      return {
        ...state,
        owner: '',
        ownerLoading: true
      }
    }
    case RECEIVE_DOMAIN_OWNER: {
      return {
        ...state,
        owner: action.owner,
        ownerLoading: false
      }
    }
    case REQUEST_DOMAIN_RESOLVER: {
      return {
        ...state,
        resolver: '',
        resolverLoading: true
      }
    }
    case RECEIVE_DOMAIN_RESOLVER: {
      return {
        ...state,
        resolver: action.resolver,
        resolverLoading: false
      }
    }
    default: return state;
  }
}

export default adminReducer;
