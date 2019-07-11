import { combineReducers } from 'redux';
import {
  OWNER, RESOLVER, TTL,
  ADD_SUBDOMAIN, RECEIVE_SUBDOMAIN_OWNER, CLEAR_SUBDOMAINS,
  REQUEST_SET_SUBDOMAIN_OWNER, RECEIVE_SET_SUBDOMAIN_OWNER, VIEW_EDIT_SUBDOMAIN_OWNER,
} from './types';
import fieldReducer from '../../factories/reducerFactory';

const subdomains = (state = [], action) => {
  switch (action.type) {
    case ADD_SUBDOMAIN: {
      return [...state, {
        label: action.label,
        owner: '...',
        viewEdit: false,
        editing: false,
      }];
    }
    case RECEIVE_SUBDOMAIN_OWNER: {
      return state.map(subdomain => (subdomain.label === action.label
        ? {
          ...subdomain,
          owner: action.owner,
        } : subdomain));
    }
    case VIEW_EDIT_SUBDOMAIN_OWNER: {
      return state.map(subdomain => (subdomain.label === action.label
        ? {
          ...subdomain,
          viewEdit: !subdomain.viewEdit,
        } : subdomain));
    }
    case REQUEST_SET_SUBDOMAIN_OWNER: {
      return state.map(subdomain => (subdomain.label === action.label
        ? {
          ...subdomain,
          editing: true,
        } : subdomain));
    }
    case RECEIVE_SET_SUBDOMAIN_OWNER: {
      return state.map(subdomain => (subdomain.label === action.label
        ? {
          ...subdomain,
          editing: false,
        } : subdomain));
    }
    case CLEAR_SUBDOMAINS: return [];
    default: return state;
  }
};

export default combineReducers({
  owner: fieldReducer(OWNER),
  resolver: fieldReducer(RESOLVER),
  ttl: fieldReducer(TTL),
  subdomains,
});
