import {
  RECEIVE_SET_CHAIN_ADDRESS, WAITING_SET_CHAIN_ADDRESS, ERROR_SET_CHAIN_ADDRESS,
  REQUEST_SET_CHAIN_ADDRESS, CLOSE_SET_CHAIN_ADDRESS,
} from './types';

const initialState = {
  setIsEditing: false,
  setIsWaiting: false,
  setIsSuccess: false,
  setIsError: false,
  setSuccessTx: '',
  setError: '',
};

const resolverReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_SET_CHAIN_ADDRESS: return {
      ...state,
      setIsEditing: true,
    };
    case WAITING_SET_CHAIN_ADDRESS: return {
      ...state,
      setIsWaiting: true,
    };
    case RECEIVE_SET_CHAIN_ADDRESS: return {
      ...state,
      setIsEditing: false,
      setIsWaiting: false,
      setIsSuccess: true,
      setSuccessTx: action.resultTx,
    };
    case ERROR_SET_CHAIN_ADDRESS: return {
      ...state,
      setIsError: true,
      setIsEditing: false,
      setIsWaiting: false,
      setError: action.message,
    };
    case CLOSE_SET_CHAIN_ADDRESS: return {
      ...state,
      setIsError: false,
      setIsSuccess: false,
      setSuccessTx: '',
      setError: '',
    };
    default: return state;
  }
};

export default resolverReducer;
