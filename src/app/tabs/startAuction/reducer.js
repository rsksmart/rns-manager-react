import { REQUEST_START_AUCTION, RECEIVE_START_AUCTION } from './types';

const initialState = {
  loading: false,
};

const startAuctionReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_START_AUCTION: return {
      loading: true,
    };
    case RECEIVE_START_AUCTION: return {
      loading: false,
    };
    default: return state;
  }
};

export default startAuctionReducer;
