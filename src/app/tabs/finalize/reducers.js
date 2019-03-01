import { REQUEST_FINALIZE, RECEIVE_FINALIZE, ERROR_FINALIZE } from './types';
import { MetamaskResponseType } from '../../types';

const initialState = {
  loading: false,
  response: null
};

const finalizeReducer = (state = initialState, action) => {
  switch(action.type) {
    case REQUEST_FINALIZE: return {
      loading: true,
      response: null
    };
    case RECEIVE_FINALIZE: return {
      loading: false,
      response: {
        type: MetamaskResponseType.SUCCESS,
        message: action.response
      }
    };
    case ERROR_FINALIZE: return {
      loading: false,
      response: {
        type: MetamaskResponseType.ERROR,
        message: action.error
      }
    };
    default: return state;
  }
};

export default finalizeReducer;
