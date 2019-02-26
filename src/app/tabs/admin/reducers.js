import {
  ADMIN_DOMAIN,
  REQUEST_DOMAIN_OWNER, RECEIVE_DOMAIN_OWNER,
  REQUEST_DOMAIN_RESOLVER, RECEIVE_DOMAIN_RESOLVER,
  REQUEST_DOMAIN_TTL, RECEIVE_DOMAIN_TTL,
  ADD_SUBDOMAIN,
  RECEIVE_SUBDOMAIN_OWNER
} from './types';

const initialState = {
  domain: '',
  owner: '',
  ownerLoading: false,
  resolver: '',
  resolverLoading: false,
  ttl: null,
  ttlLoading: false,
  subdomains: []
};

const adminReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADMIN_DOMAIN: {
      return {
        ...state,
        domain: action.domain
      }
    }
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
    case ADD_SUBDOMAIN: {
      return {
        ...state,
        subdomains: [...state.subdomains, {
          label: action.subdomain,
          owner: ''
        }]
      }
    }
    case RECEIVE_SUBDOMAIN_OWNER: {
      return {
        ...state,
        subdomains: state.subdomains.map(subdomain =>
          subdomain.label === action.label ? { ...subdomain, owner: action.owner } : subdomain
        )
      };
    }
    default: return state;
  }
}

export default adminReducer;
