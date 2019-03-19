import { REQUEST_RESOLVE_ADDRESS, RECEIVE_RESOLVE_ADDRESS, } from './types';

const initialState = {
  address: '',
  resolveAddressLoading: false
};

const homeReducer = (state = initialState, action) => {
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
    default: return state;
  }
};

export default homeReducer;
