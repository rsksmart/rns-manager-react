import { REQUEST_FINALIZE, RECEIVE_FINALIZE } from './types';

const initialState = {
  loading: false,
};

const finalizeReducer = (state = initialState, action) => {
  switch(action.type) {
    case REQUEST_FINALIZE: return {
      loading: true
    };
    case RECEIVE_FINALIZE: return {
      loading: false
    };
    default: return state;
  }
};

export default finalizeReducer;
