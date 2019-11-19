import { combineReducers } from 'redux';
import {
  OWNER, RESOLVER, TTL,
  ADD_SUBDOMAIN, RECEIVE_SUBDOMAIN_OWNER, CLEAR_SUBDOMAINS,
  REQUEST_SET_SUBDOMAIN_OWNER, RECEIVE_SET_SUBDOMAIN_OWNER, VIEW_EDIT_SUBDOMAIN_OWNER,
  REVERSE_REQUEST_GET, REVERSE_RECEIVE_GET, REVERSE_REQUEST_SET,
  REVERSE_RECEIVE_SET, REVERSE_ERROR_SET,
  FIFS_MIGRATION_CHECK_SUBDOMAIN, FIFS_MIGRATION_REQUEST_CHECK_MIGRATION,
  FIFS_MIGRATION_RECEIVE_CHECK_MIGRATION, FIFS_MIGRATION_RECEIVE_MIGRATION,
  FIFS_MIGRATION_REQUEST_MIGRATION, FIFS_MIGRATION_ERROR_MIGRATION,
  FIFS_MIGRATION_ERROR_CHECK_MIGRATION,
} from './types';
import fieldReducer from '../../factories/reducerFactory';

const subdomains = (state = [], action = {}) => {
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

const defaultReverse = {
  reverseResolution: undefined,
  getting: false,
  setting: false,
};

const reverse = (state = defaultReverse, action) => {
  switch (action.type) {
    case (REVERSE_REQUEST_GET): {
      return {
        ...state,
        getting: true,
      };
    }
    case (REVERSE_RECEIVE_GET): {
      return {
        ...state,
        getting: false,
        reverseResolution: action.reverseResolution,
      };
    }
    case (REVERSE_REQUEST_SET): {
      return {
        ...state,
        setting: true,
        reverseResolution: undefined,
      };
    }
    case (REVERSE_RECEIVE_SET): {
      return {
        ...state,
        setting: false,
        reverseResolution: action.reverseResolution,
      };
    }
    case (REVERSE_ERROR_SET): {
      return {
        ...state,
        setting: false,
        reverseResolution: undefined,
      };
    }
    default: return state;
  }
};

const defaultFifsMigration = {
  isSubdomain: undefined,
  migrated: false,
  checking: false,
  migrating: false,
  justMigrated: false,
};

const fifsMigration = (state = defaultFifsMigration, action) => {
  switch (action.type) {
    case (FIFS_MIGRATION_CHECK_SUBDOMAIN): {
      return {
        ...state,
        isSubdomain: action.isSubdomain,
      };
    }
    case (FIFS_MIGRATION_REQUEST_CHECK_MIGRATION): {
      return {
        ...state,
        checking: true,
      };
    }
    case (FIFS_MIGRATION_RECEIVE_CHECK_MIGRATION): {
      return {
        ...state,
        migrated: action.migrated,
        checking: false,
      };
    }
    case (FIFS_MIGRATION_ERROR_CHECK_MIGRATION): {
      return {
        ...state,
        migrated: false,
        checking: false,
      };
    }
    case (FIFS_MIGRATION_REQUEST_MIGRATION): {
      return {
        ...state,
        migrating: true,
      };
    }
    case (FIFS_MIGRATION_RECEIVE_MIGRATION): {
      return {
        ...state,
        migrating: false,
        migrated: true,
        justMigrated: true,
      };
    }
    case (FIFS_MIGRATION_ERROR_MIGRATION): {
      return {
        ...state,
        migrated: false,
        migrating: false,
        justMigrated: false,
      };
    }
    default: return state;
  }
};

export default combineReducers({
  owner: fieldReducer(OWNER),
  resolver: fieldReducer(RESOLVER),
  ttl: fieldReducer(TTL),
  subdomains,
  reverse,
  fifsMigration,
});
