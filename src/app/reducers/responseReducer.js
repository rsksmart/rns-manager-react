import { TRANSACTION_ERROR } from '../types';

var errorId = 0;

const initialState = {
  errors: []
};

const responseReducer = (state = initialState, action) => {
  switch(action.type) {
    case TRANSACTION_ERROR: {
    console.log(action)
    return {
      ...state,
      errors: [
        ...state.errors,
        {
          id: errorId++,
          message: action.message
        }
      ]
    }}
    default: return state;
  }
};

export default responseReducer;
