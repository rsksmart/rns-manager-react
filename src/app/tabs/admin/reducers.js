import {
  REQUEST_DOMAIN_OWNER, RECEIVE_DOMAIN_OWNER, VIEW_EDIT_OWNER, REQUEST_SET_OWNER, RECEIVE_SET_OWNER, ERROR_SET_OWNER,
  REQUEST_DOMAIN_RESOLVER, RECEIVE_DOMAIN_RESOLVER,
  REQUEST_DOMAIN_TTL, RECEIVE_DOMAIN_TTL,
  ADD_SUBDOMAIN, RECEIVE_SUBDOMAIN_OWNER
} from './types';

const initialState = {
  owner: {
    address: '',
    loading: false,
    viewEdit: false,
    setLoading: false,
    error: null
  },
  resolver: '',
  resolverLoading: false,
  ttl: null,
  ttlLoading: false,
  subdomains: []
};

const adminReducer = (state = initialState, action) => {
  switch(action.type) {
    // owner
    case REQUEST_DOMAIN_OWNER: {
      return {
        ...state,
        owner: {
          address: '',
          loading: true,
          viewEdit: false,
          error: null
        }
      }
    }
    case RECEIVE_DOMAIN_OWNER: {
      return {
        ...state,
        owner: {
          address: action.owner,
          loading: false,
          viewEdit: state.owner.viewEdit,
          error: null
        }
      }
    }
    case VIEW_EDIT_OWNER: {
      return {
        ...state,
        owner: {
          ...state.owner,
          viewEdit: !state.owner.viewEdit,
          error: null
        }
      }
    }
    case REQUEST_SET_OWNER: {
      return {
        ...state,
        owner: {
          ...state.owner,
          setLoading: true,
          error: null
        }
      }
    }
    case RECEIVE_SET_OWNER: {
      return {
        ...state,
        owner: {
          ...state.owner,
          setLoading: false,
          owner: action.owner,
          error: null
        }
      }
    }
    case ERROR_SET_OWNER: {
      return {
        ...state,
        owner: {
          ...state.owner,
          setLoading: false,
          error: action.error
        }
      }
    }
    // resolver
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
    // ttl
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
    // subdomains
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
