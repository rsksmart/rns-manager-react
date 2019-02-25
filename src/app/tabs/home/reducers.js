import {
  REQUEST_RESOLVE_ADDRESS, RECEIVE_RESOLVE_ADDRESS,
  REQUEST_DOMAIN_STATE, RECEIVE_DOMAIN_STATE } from './types';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

const initialState = {
  address: '',
  resolveAddressLoading: false,
  auctionState: null,
  auctionStateLoading: false
};

const rnsReducer = (state = initialState, action) => {
  switch(action.type) {
    case REQUEST_RESOLVE_ADDRESS: {
      return {
        ...state,
        address: '',
        resolveAddressLoading: true
      };
    }
    case RECEIVE_RESOLVE_ADDRESS: {
      return {
        ...state,
        address: action.address,
        resolveAddressLoading: false
      };
    }
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

const rootReducer = (history) => combineReducers({
  rns: rnsReducer,
  router: connectRouter(history)
});

export default rootReducer;
