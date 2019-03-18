import { ADD_TRANSACTION_ERROR, REMOVE_TRANSACTION_ERROR, ADD_TRANSACTION_CONFIRMED } from '../types';

var txId = 0;
var errorId = 0;

const initialState = {
  transactions: [],
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
    case ADD_TRANSACTION_CONFIRMED: {
      return {
        ...state,
        transactions: [
          ...state.transactions,
          {
            id: txId++,
            txHash: action.txHash
          }
        ]
      }
    }
    default: return state;
  }
};

export default responseReducer;
