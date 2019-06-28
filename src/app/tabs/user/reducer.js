import { CHANGE_MYCRYPTO_METAMASK } from './types';

const initialState = {
  viewMyCrypto: localStorage.getItem('viewMyCrypto') === 'true',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_MYCRYPTO_METAMASK: return {
      ...state,
      viewMyCrypto: action.viewMyCrypto,
    };
    default: return state;
  }
};

export default reducer;
