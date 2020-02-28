import {
  BASIC_VIEW,
} from './types';

const initialState = {
  mode: BASIC_VIEW,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    default: return state;
  }
};

export default adminReducer;
