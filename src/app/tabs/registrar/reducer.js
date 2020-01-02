import {
  REQUEST_REGISTRAR_GET_COST, RECEIVE_REGISTRAR_GET_COST,
  REQUEST_REGISTRAR_COMMIT, RECEIVE_REGISTRAR_COMMIT, ERROR_REGISTRAR_COMMIT,
  REQUEST_REGISTRAR_REVEAL_COMMIT, RECEIVE_REGISTRAR_REVEAL_COMMIT,
  RECEIVE_CAN_REVEAL_COMMIT, ERROR_REGISTRAR_REVEAL_COMMIT, SALT_NOT_FOUND,
  REGISTRAR_COMMIT_CONFIRMED, REVEAL_COMMIT_CONFIRMED,
} from './types';

const initialState = {
  gettingCost: false,
  committing: false,
  committed: false,
  hash: null,
  revealing: false,
  revealed: false,
  waiting: false,
  canReveal: false,
  commitConfirmed: null,
  revealConfirmed: null,
  hasBalance: false,
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
      hasBalance: action.hasBalance,
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
      commitConfirmed: action.commitConfirmed || null,
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
    case ERROR_REGISTRAR_REVEAL_COMMIT: return {
      ...state,
      revealing: false,
      revealed: false,
    };
    case RECEIVE_CAN_REVEAL_COMMIT: return {
      ...state,
      canReveal: action.canReveal,
      waiting: !action.canReveal,
    };
    case REGISTRAR_COMMIT_CONFIRMED: return {
      ...state,
      commitConfirmed: true,
    };
    case REVEAL_COMMIT_CONFIRMED: return {
      ...state,
      revealConfirmed: true,
    };
    case SALT_NOT_FOUND: return {
      ...state,
      ...initialState,
    };
    default: return state;
  }
};

export default registrar;
