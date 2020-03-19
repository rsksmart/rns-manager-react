import {
  RECEIVE_RESOLVER,
} from './types';

const initialState = {
  resolverAddr: '',
  resolverName: '',
};

const resolverReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_RESOLVER: return {
      ...state,
      resolverAddr: action.resolverAddr,
      resolverName: action.resolverName,
    };
    default: return state;
  }
};

export default resolverReducer;
