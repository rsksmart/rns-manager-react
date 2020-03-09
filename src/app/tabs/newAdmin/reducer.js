import { combineReducers } from 'redux';
import domainInfo from './domainInfo/reducer';
import { SET_VIEW } from './types';

const adminReducerInitialState = {
  advancedView: false,
};

const adminReducer = (state = adminReducerInitialState, action) => {
  switch (action.type) {
    case SET_VIEW: return {
      ...state,
      advancedView: action.advancedView,
    };
    default: return state;
  }
};

export default combineReducers({
  view: adminReducer,
  domainInfo,
});
