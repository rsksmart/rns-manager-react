import { REQUEST_UNSEAL, RECEIVE_UNSEAL, ERROR_UNSEAL } from './types';
import { MetamaskResponseType } from '../../types';

const initialState = {
  loading: false,
  response: null
}

const unsealReducer = (state = initialState, action) => {
  switch(action.type) {
    case REQUEST_UNSEAL: return {
      loading: true,
      response: ''
    }
    case RECEIVE_UNSEAL: return {
      loading: true,
      response: {
        type: MetamaskResponseType.SUCCESS,
        message: action.response
      }
    }
    case ERROR_UNSEAL: return {
      loading: false,
      response: {
        type: MetamaskResponseType.ERROR,
        message: action.error
      }
    }
    default: return state;
  }
}

export default unsealReducer;
