import { ADD_TRANSACTION_ERROR, REMOVE_TRANSACTION_ERROR } from '../types';

var errorId = 0;

const initialState = {
  errors: []
};

const responseReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_TRANSACTION_ERROR: {
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
    case REMOVE_TRANSACTION_ERROR: {
      const index = state.errors.findIndex(e => e.id === action.errorId);
      return {
        ...state,
        errors: [
          ...state.errors.slice(0, index),
          ...state.errors.slice(index + 1)
        ]
      }
    }
    default: return state;
  }
};

export default responseReducer;
