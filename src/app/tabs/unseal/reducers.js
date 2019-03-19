import { REQUEST_UNSEAL, RECEIVE_UNSEAL } from './types';

const initialState = {
  loading: false
}

const unsealReducer = (state = initialState, action) => {
  switch(action.type) {
    case REQUEST_UNSEAL: return {
      loading: true
    }
    case RECEIVE_UNSEAL: return {
      loading: false
    }
    default: return state;
  }
}

export default unsealReducer;
