import { combineReducers } from 'redux';
import domainInfo from './domainInfo/reducer';
import {
  SET_VIEW, CHECK_IF_SUBDOMAIN, REQUEST_CHECK_OWNERSHIP, RECIEVE_CHECK_OWNERSHIP,
  ERROR_CHECK_OWNERSHIP,
} from './types';

const adminReducerInitialState = {
  advancedView: false,
  isSubdomain: false,
  checkingOwnership: false,
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
    }
    default: return state;
  }
};

export default combineReducers({
  view: adminReducer,
  domainInfo,
});
