import { ADD_TRANSACTION_ERROR, REMOVE_TRANSACTION_ERROR, ADD_TRANSACTION_CONFIRMED, TRANSACTION_MINED } from '../types';

var errorId = 0;

const initialState = {
  transactions: [],
  errors: []
};

const newTx = txHash => ({
  txHash: txHash,
  mined: false
});

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
          newTx(action.txHash)
        ]
      }
    }
    case TRANSACTION_MINED: {
      return {
        ...state,
        transactions: state.transactions.map(tx => tx.txHash === action.txHash ? { ...tx, mined: true } : tx)
      }
    }
    default: return state;
  }
};

export default responseReducer;
