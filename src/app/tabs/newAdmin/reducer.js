import { combineReducers } from 'redux';

import addresses from './addresses/reducer';
import domainInfo from './domainInfo/reducer';
import subdomains from './subdomains/reducer';
import reverse from './reverse/reducer';
import resolver from './resolver/reducer';

import {
  SET_VIEW, CHECK_IF_SUBDOMAIN, REQUEST_CHECK_OWNERSHIP, RECIEVE_CHECK_OWNERSHIP,
  ERROR_CHECK_OWNERSHIP, REQUEST_FIFS_MIGRATION_STATUS, RECEIVE_FIFS_MIGRATION_STATUS,
  ERROR_FIFS_MIGRATION_STATUS, REQUEST_REGISTRY_OWNER, RECEIVE_REGISTRY_OWNER,
} from './types';

const adminReducerInitialState = {
  advancedView: false,
  isSubdomain: false,
  checkingOwnership: false,
  checkingFifs: false,
  isFifsMigrated: true,
  checkingRegistryOwner: false,
  registryOwner: '',
  isRegistryOwner: false,
  isTokenOwner: false,
};

const adminReducer = (state = adminReducerInitialState, action) => {
  switch (action.type) {
    case SET_VIEW: return {
      ...state,
      advancedView: action.advancedView,
    };
    case CHECK_IF_SUBDOMAIN: return {
      ...state,
      isSubdomain: action.result,
    };
    case REQUEST_CHECK_OWNERSHIP: return {
      ...state,
      checkingOwnership: true,
    };
    case RECIEVE_CHECK_OWNERSHIP: return {
      ...state,
      checkingOwnership: false,
      isTokenOwner: action.isTokenOwner,
      currentOwner: action.currentOwner,
    };
    case ERROR_CHECK_OWNERSHIP: return {
      ...state,
      checkingOwnership: false,
    };

    case REQUEST_FIFS_MIGRATION_STATUS: return {
      ...state,
      checkingFifs: true,
    };
    case RECEIVE_FIFS_MIGRATION_STATUS: return {
      ...state,
      checkingFifs: false,
      isFifsMigrated: action.result,
    };
    case ERROR_FIFS_MIGRATION_STATUS: return {
      ...state,
      checkingFifs: false,
    };

    case REQUEST_REGISTRY_OWNER: return {
      ...state,
      checkingRegistryOwner: true,
    };
    case RECEIVE_REGISTRY_OWNER: return {
      ...state,
      checkingRegistryOwner: false,
      registryOwner: action.owner,
      isRegistryOwner: action.isOwner,
    };

    default: return state;
  }
};

export default combineReducers({
  view: adminReducer,
  addresses,
  domainInfo,
  subdomains,
  reverse,
  resolver,
});
