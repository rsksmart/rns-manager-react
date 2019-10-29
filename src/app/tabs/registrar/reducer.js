import {
  REQUEST_REGISTRAR_GET_COST, RECEIVE_REGISTRAR_GET_COST,
  REQUEST_REGISTRAR_COMMIT, RECEIVE_REGISTRAR_COMMIT, ERROR_REGISTRAR_COMMIT,
  REQUEST_REGISTRAR_REVEAL_COMMIT, RECEIVE_REGISTRAR_REVEAL_COMMIT,
  RECEIVE_CAN_REVEAL_COMMIT,
} from './types';

const initialState = {
  gettingCost: false,
  committing: false,
  committed: false,
  hash: undefined,
  revealing: false,
  revealed: false,
  waiting: false,
};
const registrar = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_REGISTRAR_GET_COST: return {
      ...state,
      gettingCost: true,
      duration: action.duration,
    };
    case RECEIVE_REGISTRAR_GET_COST: return {
      ...state,
      gettingCost: false,
      rifCost: action.rifCost,
    };
    case REQUEST_REGISTRAR_COMMIT: return {
      ...state,
      committing: true,
    };
    case RECEIVE_REGISTRAR_COMMIT: return {
      ...state,
      committing: false,
      committed: true,
      waiting: true,
      hash: action.hash,
    };
    case ERROR_REGISTRAR_COMMIT: return {
      ...state,
      committing: false,
      committed: false,
    };
    case REQUEST_REGISTRAR_REVEAL_COMMIT: return {
      ...state,
      revealing: true,
    };
    case RECEIVE_REGISTRAR_REVEAL_COMMIT: return {
      ...state,
      revealing: false,
      revealed: true,
    };
    case RECEIVE_CAN_REVEAL_COMMIT: return {
      ...state,
      canReveal: action.canReveal,
    };
    default: return state;
  }
};

export default registrar;
