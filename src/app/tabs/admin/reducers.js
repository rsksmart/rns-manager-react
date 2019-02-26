import {
  REQUEST_DOMAIN_OWNER, RECEIVE_DOMAIN_OWNER
} from './types';

const initialState = {
  owner: '',
  ownerLoading: false
};

const adminReducer = (state = initialState, action) => {
  switch(action.type) {
    case REQUEST_DOMAIN_OWNER: {
      return {
        ...state,
        owner: '',
        ownerLoading: true
      }
    }
    case RECEIVE_DOMAIN_OWNER: {
      return {
        ...state,
        owner: action.owner,
        ownerLoading: false
      }
    }
    default: return state;
  }
}

export default adminReducer;
