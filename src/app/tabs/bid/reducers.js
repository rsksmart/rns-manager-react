import { REQUEST_BID, RECEIVE_BID } from './types';

const initialState = {
  loading: false
};

const bidReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_BID: return {
      loading: true
    }
    case RECEIVE_BID: return {
      loading: false
    }
    default: return state
  }
};

export default bidReducer;
