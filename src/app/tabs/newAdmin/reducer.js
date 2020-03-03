import {
  BASIC_VIEW,
  TOGGLE_BASIC_ADVANCED,
} from './types';

const initialState = {
  mode: BASIC_VIEW,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_BASIC_ADVANCED: return {
      ...state,
      mode: action.mode,
    };
    default: return state;
  }
};

export default adminReducer;
