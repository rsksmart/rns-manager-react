import {
  REQUEST_REGISTRAR_GET_COST, RECEIVE_REGISTRAR_GET_COST,
  REQUEST_REGISTRAR_COMMIT, RECEIVE_REGISTRAR_COMMIT,
} from './types';

const initialState = {
  gettingCost: false,
  committing: false,
  committed: false,
  owner: undefined,
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
      owner: action.owner,
    };
    default: return state;
  }
};

export default registrar;
