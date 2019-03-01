import {
  REQUEST_DOMAIN_OWNER, RECEIVE_DOMAIN_OWNER, CHANGE_EDIT_OWNER, REQUEST_SET_OWNER, RECEIVE_SET_OWNER, ERROR_SET_OWNER,
  REQUEST_DOMAIN_RESOLVER, RECEIVE_DOMAIN_RESOLVER, CHANGE_EDIT_RESOLVER, REQUEST_SET_RESOLVER, RECEIVE_SET_RESOLVER, ERROR_SET_RESOLVER,
  REQUEST_DOMAIN_TTL, RECEIVE_DOMAIN_TTL,
  ADD_SUBDOMAIN, RECEIVE_SUBDOMAIN_OWNER
} from './types';

const initialState = {
  owner: {
    getting: false,
    value: null,
    editOpen: false,
    editting: false,
    response: null,
    hasError: false
  },
  resolver: {
    getting: false,
    value: null,
    editOpen: false,
    editting: false,
    response: null,
    hasError: false
  },
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
          value: null,
          getting: true,
          editOpen: false,
          editting: false,
          response: null,
          hasError: false
        }
      }
    }
    case RECEIVE_DOMAIN_OWNER: {
      return {
        ...state,
        owner: {
          ...state.owner,
          value: action.owner,
          getting: false,
        }
      }
    }
    case CHANGE_EDIT_OWNER: {
      return {
        ...state,
        owner: {
          ...state.owner,
          editOpen: !state.owner.editOpen,
        }
      }
    }
    case REQUEST_SET_OWNER: {
      return {
        ...state,
        owner: {
          ...state.owner,
          editting: true,
          response: null,
          hasError: false
        }
      }
    }
    case RECEIVE_SET_OWNER: {
      return {
        ...state,
        owner: {
          ...state.owner,
          editting: false,
          response: action.response,
          hasError: false
        }
      }
    }
    case ERROR_SET_OWNER: {
      return {
        ...state,
        owner: {
          ...state.owner,
          editting: false,
          response: action.error.message,
          hasError: true
        }
      }
    }
    // resolver
    case REQUEST_DOMAIN_RESOLVER: {
      return {
        ...state,
        resolver: {
          value: null,
          getting: true,
          editOpen: false,
          editting: false,
          response: null,
          hasError: false
        }
      }
    }
    case RECEIVE_DOMAIN_RESOLVER: {
      return {
        ...state,
        resolver: {
          ...state.resolver,
          value: action.resolver,
          getting: false,
        }
      }
    }
    case CHANGE_EDIT_RESOLVER: {
      return {
        ...state,
        resolver: {
          ...state.resolver,
          editOpen: !state.resolver.editOpen,
        }
      }
    }
    case REQUEST_SET_RESOLVER: {
      return {
        ...state,
        resolver: {
          ...state.resolver,
          editting: true,
          response: null,
          hasError: false
        }
      }
    }
    case RECEIVE_SET_RESOLVER: {
      return {
        ...state,
        resolver: {
          ...state.resolver,
          editting: false,
          response: action.response,
          hasError: false
        }
      }
    }
    case ERROR_SET_RESOLVER: {
      return {
        ...state,
        resolver: {
          ...state.resolver,
          editting: false,
          response: action.error.message,
          hasError: true
        }
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
