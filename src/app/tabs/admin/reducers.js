import {
  REQUEST_DOMAIN_OWNER, RECEIVE_DOMAIN_OWNER, CHANGE_EDIT_OWNER, REQUEST_SET_OWNER, RECEIVE_SET_OWNER, ERROR_SET_OWNER,
  REQUEST_DOMAIN_RESOLVER, RECEIVE_DOMAIN_RESOLVER, CHANGE_EDIT_RESOLVER, REQUEST_SET_RESOLVER, RECEIVE_SET_RESOLVER, ERROR_SET_RESOLVER,
  REQUEST_DOMAIN_TTL, RECEIVE_DOMAIN_TTL, CHANGE_EDIT_TTL, REQUEST_SET_TTL, RECEIVE_SET_TTL, ERROR_SET_TTL,
  ADD_SUBDOMAIN, RECEIVE_SUBDOMAIN_OWNER,
  REQUEST_SET_SUBDOMAIN_OWNER, RECEIVE_SET_SUBDOMAIN_OWNER, ERROR_SET_SUBDOMAIN_OWNER, VIEW_EDIT_SUBDOMAIN_OWNER
} from './types';

const propInitialState = () => ({
  getting: false,
  value: null,
  editOpen: false,
  editting: false,
  response: null,
  hasError: false
});

const initialState = {
  owner: propInitialState(),
  resolver: propInitialState(),
  ttl: propInitialState(),
  subdomains: []
};

const requestGetProp = () => ({
  value: null,
  getting: true,
  editOpen: false,
  editting: false,
  response: null,
  hasError: false
});

const receiveGetProp = (prop, value) => ({
  ...prop,
  value,
  getting: false
});

const changeEditProp = (prop) => ({
  ...prop,
  editOpen: !prop.editOpen
});

const requestSetProp = (prop) => ({
  ...prop,
  editting: true,
  response: null,
  hasError: false
});

const receiveSetProp = (prop, value) => ({
  ...prop,
  editting: false,
  response: value,
  hasError: false
});

const errorSetProp = (prop, error) => ({
  ...prop,
  editting: false,
  response: error.message,
  hasError: true
});

const adminReducer = (state = initialState, action) => {
  switch(action.type) {
    // owner
    case REQUEST_DOMAIN_OWNER: {
      return {
        ...state,
        owner: requestGetProp()
      }
    }
    case RECEIVE_DOMAIN_OWNER: {
      return {
        ...state,
        owner: receiveGetProp(state.owner, action.owner)
      }
    }
    case CHANGE_EDIT_OWNER: {
      return {
        ...state,
        owner: changeEditProp(state.owner)
      }
    }
    case REQUEST_SET_OWNER: {
      return {
        ...state,
        owner: requestSetProp(state.owner)
      }
    }
    case RECEIVE_SET_OWNER: {
      return {
        ...state,
        owner: receiveSetProp(state.owner, action.response)
      }
    }
    case ERROR_SET_OWNER: {
      return {
        ...state,
        owner: errorSetProp(state.owner, action.error)
      }
    }
    // resolver
    case REQUEST_DOMAIN_RESOLVER: {
      return {
        ...state,
        resolver: requestGetProp()
      }
    }
    case RECEIVE_DOMAIN_RESOLVER: {
      return {
        ...state,
        resolver: receiveGetProp(state.resolver, action.resolver)
      }
    }
    case CHANGE_EDIT_RESOLVER: {
      return {
        ...state,
        resolver: changeEditProp(state.resolver)
      }
    }
    case REQUEST_SET_RESOLVER: {
      return {
        ...state,
        resolver: requestSetProp(state.resolver)
      }
    }
    case RECEIVE_SET_RESOLVER: {
      return {
        ...state,
        resolver: receiveSetProp(state.resolver, action.response)
      }
    }
    case ERROR_SET_RESOLVER: {
      return {
        ...state,
        resolver: errorSetProp(state.resolver, action.error)
      }
    }
    // ttl
    case REQUEST_DOMAIN_TTL: {
      return {
        ...state,
        ttl: requestGetProp()
      }
    }
    case RECEIVE_DOMAIN_TTL: {
      return {
        ...state,
        ttl: receiveGetProp(state.ttl, action.ttl)
      }
    }
    case CHANGE_EDIT_TTL: {
      return {
        ...state,
        ttl: changeEditProp(state.ttl)
      }
    }
    case REQUEST_SET_TTL: {
      return {
        ...state,
        ttl: requestSetProp(state.ttl)
      }
    }
    case RECEIVE_SET_TTL: {
      return {
        ...state,
        ttl: receiveSetProp(state.ttl, action.response)
      }
    }
    case ERROR_SET_TTL: {
      return {
        ...state,
        ttl: errorSetProp(state.ttl, action.error)
      }
    }
    // subdomains
    case ADD_SUBDOMAIN: {
      return {
        ...state,
        subdomains: [...state.subdomains, {
          label: action.subdomain,
          owner: '',
          viewEdit: false,
          editting: false,
          response: null,
          hasError: false
        }]
      }
    }
    case RECEIVE_SUBDOMAIN_OWNER: {
      return {
        ...state,
        subdomains: state.subdomains.map(subdomain =>
          subdomain.label === action.label ?
          {
            ...subdomain,
            owner: action.owner
          } : subdomain
        )
      };
    }
    // set subdomain owner
    case VIEW_EDIT_SUBDOMAIN_OWNER: {
      return {
        ...state,
        subdomains: state.subdomains.map(subdomain =>
          subdomain.label === action.label ?
          {
            ...subdomain,
            viewEdit: !subdomain.viewEdit
          } : subdomain
        )
      }
    }
    case REQUEST_SET_SUBDOMAIN_OWNER: {
      return {
        ...state,
        subdomains: state.subdomains.map(subdomain =>
          subdomain.label === action.label ?
          {
            ...subdomain,
            editting: true
          } : subdomain
        )
      }
    }
    case RECEIVE_SET_SUBDOMAIN_OWNER: {
      return {
        ...state,
        subdomains: state.subdomains.map(subdomain =>
          subdomain.label === action.label ?
          {
            ...subdomain,
            editting: false,
            response: action.response,
            hasError: false
          } : subdomain
        )
      }
    }
    case ERROR_SET_SUBDOMAIN_OWNER: {
      return {
        ...state,
        subdomains: state.subdomains.map(subdomain =>
          subdomain.label === action.label ? {
            ...subdomain,
            editting: false,
            response: action.error.message,
            hasError: true
          } : subdomain
        )
      }
    }
    default: return state;
  }
}

export default adminReducer;
