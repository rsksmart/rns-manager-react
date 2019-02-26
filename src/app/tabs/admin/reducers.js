import {
  REQUEST_DOMAIN_OWNER, RECEIVE_DOMAIN_OWNER,
  REQUEST_DOMAIN_RESOLVER, RECEIVE_DOMAIN_RESOLVER,
  REQUEST_DOMAIN_TTL, RECEIVE_DOMAIN_TTL
} from './types';

const initialState = {
  owner: '',
  ownerLoading: false,
  resolver: '',
  resolverLoading: false,
  ttl: null,
  ttlLoading: false
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
    case REQUEST_DOMAIN_TTL: {
      return {
        ...state,
        ttl: '',
        ttlLoading: true
      }
    }
    case RECEIVE_DOMAIN_TTL: {
      return {
        ...state,
        ttl: action.ttl,
        ttlLoading: false
      }
    }
    default: return state;
  }
}

export default adminReducer;
