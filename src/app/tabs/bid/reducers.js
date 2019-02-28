import {
  REQUEST_BID, RECEIVE_BID, ERROR_BID, ResponseType
} from './types';

const initialState = {
  loading: false,
  response: null
};

const bidReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_BID: return {
      loading: true,
      response: null
    }
    case RECEIVE_BID: return {
      loading: false,
      response: {
        type: ResponseType.SUCCESS,
        message: action.response
      }
    }
    case ERROR_BID: return {
      loading: false,
      response: {
        type: ResponseType.ERROR,
        message: action.response
      }
    }
    default: return state
  }
};

export default bidReducer;
