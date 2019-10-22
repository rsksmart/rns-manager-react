import { REQUEST_DOMAIN_STATE, RECEIVE_DOMAIN_STATE, BLOCKED_DOMAIN } from './types';

// TODO: check initial state
const initialState = {
  owned: undefined,
  domainStateLoading: false,
  blocked: undefined,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_DOMAIN_STATE: {
      return {
        ...state,
        domainStateLoading: true,
      };
    }
    case RECEIVE_DOMAIN_STATE: {
      return {
        ...state,
        owned: action.owned,
        domainStateLoading: false,
        blocked: false,
      };
    }
    case BLOCKED_DOMAIN: {
      return {
        ...state,
        domainStateLoading: false,
        blocked: true,
      };
    }
    default: return state;
  }
};

export default searchReducer;
