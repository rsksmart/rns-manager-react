import {
  OWNER, RESOLVER, TTL,
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
    case OWNER.REQUEST_GET: {
      return {
        ...state,
        owner: requestGetProp(state.owner)
      }
    }
    case OWNER.RECEIVE_GET: {
      return {
        ...state,
        owner: receiveGetProp(state.owner, action.value)
      }
    }
    case OWNER.CHANGE_EDIT: {
      return {
        ...state,
        owner: changeEditProp(state.owner)
      }
    }
    case OWNER.REQUEST_SET: {
      return {
        ...state,
        owner: requestSetProp(state.owner)
      }
    }
    case OWNER.RECEIVE_SET: {
      return {
        ...state,
        owner: receiveSetProp(state.owner)
      }
    }
    // resolver
    case RESOLVER.REQUEST_GET: {
      return {
        ...state,
        resolver: requestGetProp(state.resolver)
      }
    }
    case RESOLVER.RECEIVE_GET: {
      return {
        ...state,
        resolver: receiveGetProp(state.resolver, action.value)
      }
    }
    case RESOLVER.CHANGE_EDIT: {
      return {
        ...state,
        resolver: changeEditProp(state.resolver)
      }
    }
    case RESOLVER.REQUEST_SET: {
      return {
        ...state,
        resolver: requestSetProp(state.resolver)
      }
    }
    case RESOLVER.RECEIVE_SET: {
      return {
        ...state,
        resolver: receiveSetProp(state.resolver)
      }
    }
    // ttl
    case TTL.REQUEST_GET: {
      return {
        ...state,
        ttl: requestGetProp(state.ttl)
      }
    }
    case TTL.RECEIVE_GET: {
      return {
        ...state,
        ttl: receiveGetProp(state.ttl, action.value.toNumber())
      }
    }
    case TTL.CHANGE_EDIT: {
      return {
        ...state,
        ttl: changeEditProp(state.ttl)
      }
    }
    case TTL.REQUEST_SET: {
      return {
        ...state,
        ttl: requestSetProp(state.ttl)
      }
    }
    case TTL.RECEIVE_SET: {
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
