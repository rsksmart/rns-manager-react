import { SET_VIEW } from './types';

const initialState = {
  advancedView: false,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VIEW: return {
      ...state,
      advancedView: action.advancedView,
    };
    default: return state;
  }
};

export default adminReducer;
