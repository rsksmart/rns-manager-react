import {
  REQUEST_START_AUCTION, RECEIVE_START_AUCTION, ERROR_START_AUCTION
} from './types';
import { MetamaskResponseType } from '../../types';

const initialState = {
  loading: false,
  response: null
};

const startAuctionReducer = (state = initialState, action) => {
  switch(action.type) {
    case REQUEST_START_AUCTION: return {
      loading: true,
      response: null
    }
    case RECEIVE_START_AUCTION: return {
      loading: false,
      response: {
        type: MetamaskResponseType.SUCCESS,
        message: action.response
      }
    }
    case ERROR_START_AUCTION: return {
      loading: false,
      response: {
        type: MetamaskResponseType.ERROR,
        message: action.error
      }
    }
    default: return state
  }
}

export default startAuctionReducer;
