import {
  REQUEST_REVERSE_RESOLVER, RECEIVE_REVERSE_RESOLVER,
} from './types';

const initialState = {
  isRequesting: false,
  value: '',
};

const renewDomain = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_REVERSE_RESOLVER: return {
      ...state,
      isRequesting: true,
    };
    case RECEIVE_REVERSE_RESOLVER: return {
      ...state,
      value: action.value,
      isRequesting: false,
    };
    default: return state;
  }
};

export default renewDomain;
