import { RECEIVE_GET_COST, REQUEST_GET_COST } from './types';

const initialState = {
  gettingCost: false,
};
const registrar = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_GET_COST: return {
      gettingCost: true,
    };
    case RECEIVE_GET_COST: return {
      gettingCost: false,
      rifCost: action.rifCost,
    };
    default: return state;
  }
};

export default registrar;
