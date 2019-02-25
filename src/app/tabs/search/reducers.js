import {
  REQUEST_DOMAIN_STATE, RECEIVE_DOMAIN_STATE
} from './types';

const initialState = {
  auctionState: null,
  auctionStateLoading: false
};

const searchReducer = (state = initialState, action) => {
  switch(action.type) {
    case REQUEST_DOMAIN_STATE: {
      return {
        ...state,
        auctionState: '',
        auctionStateLoading: true
      };
    }
    case RECEIVE_DOMAIN_STATE: {
      return {
        ...state,
        auctionState: action.state,
        auctionStateLoading: false
      };
    }
    default: return state;
  }
};

export default searchReducer;
