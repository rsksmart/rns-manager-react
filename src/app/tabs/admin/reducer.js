import {
  REQUEST_DOMAIN_OWNER, RECEIVE_DOMAIN_OWNER, CHANGE_EDIT_OWNER, REQUEST_SET_OWNER, RECEIVE_SET_OWNER,
  REQUEST_DOMAIN_RESOLVER, RECEIVE_DOMAIN_RESOLVER, CHANGE_EDIT_RESOLVER, REQUEST_SET_RESOLVER, RECEIVE_SET_RESOLVER,
  REQUEST_DOMAIN_TTL, RECEIVE_DOMAIN_TTL, CHANGE_EDIT_TTL, REQUEST_SET_TTL, RECEIVE_SET_TTL,
  ADD_SUBDOMAIN, RECEIVE_SUBDOMAIN_OWNER,
  REQUEST_SET_SUBDOMAIN_OWNER, RECEIVE_SET_SUBDOMAIN_OWNER, VIEW_EDIT_SUBDOMAIN_OWNER
} from './types';

const propInitialState = () => ({
  getting: false,
  value: null,
  editOpen: false,
  editting: false
});

const initialState = {
  owner: propInitialState(),
  resolver: propInitialState(),
  ttl: propInitialState(),
  subdomains: []
};

const requestGetProp = (prop) => ({
  ...prop,
  getting: true,
  value: null
});

const receiveGetProp = (prop, value) => ({
  ...prop,
  getting: false,
  value
});

const changeEditProp = (prop) => ({
  ...prop,
  editOpen: !prop.editOpen
});

const requestSetProp = (prop) => ({
  ...prop,
  editting: true
});

const receiveSetProp = (prop) => ({
  ...prop,
  editting: false,
});

const adminReducer = (state = initialState, action) => {
  switch(action.type) {
    // owner
    case REQUEST_DOMAIN_OWNER: {
      return {
        ...state,
        owner: requestGetProp(state.owner)
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
        owner: receiveSetProp(state.owner)
      }
    }
    // resolver
    case REQUEST_DOMAIN_RESOLVER: {
      return {
        ...state,
        resolver: requestGetProp(state.resolver)
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
        resolver: receiveSetProp(state.resolver)
      }
    }
    // ttl
    case REQUEST_DOMAIN_TTL: {
      return {
        ...state,
        ttl: requestGetProp(state.ttl)
      }
    }
    case RECEIVE_DOMAIN_TTL: {
      return {
        ...state,
        ttl: receiveGetProp(state.ttl, action.ttl.toNumber())
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
        ttl: receiveSetProp(state.ttl)
      }
    }
    // subdomains
    case ADD_SUBDOMAIN: {
      return {
        ...state,
        subdomains: [...state.subdomains, {
          label: action.label,
          owner: '...',
          viewEdit: false,
          editting: false
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
          } : subdomain
        )
      }
    }
    default: return state;
  }
}

export default adminReducer;
