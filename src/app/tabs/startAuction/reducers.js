import {
  REQUEST_START_AUCTION, RECEIVE_START_AUCTION, ERROR_START_AUCTION, ResponseType
 } from './types';

const initialState = {
  loading: false,
  response: null
};

export const startAuctionReducer = (state = initialState, action) => {
  switch(action.type) {
    case REQUEST_START_AUCTION: return {
      loading: true,
      error: null
    }
    case RECEIVE_START_AUCTION: return {
      loading: false,
      response: {
        type: ResponseType.SUCCESS,
        message: action.response
      }
    }
    case ERROR_START_AUCTION: return {
      loading: false,
      response: {
        type: ResponseType.ERROR,
        message: action.error
      }
    }
    default: return state
  }
}