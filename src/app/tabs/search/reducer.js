import {
  REQUEST_DOMAIN_STATE, RECEIVE_DOMAIN_STATE, BLOCKED_DOMAIN,
  REQUEST_DOMAIN_OWNER, RECEIVE_DOMAIN_OWNER, RECEIVE_DOMAIN_COST,
} from './types';

// TODO: check initial state
const initialState = {
  owned: undefined,
  owner: undefined,
  domainStateLoading: false,
  blocked: undefined,
  requestingOwner: false,
  rifCost: 0,
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
    case REQUEST_DOMAIN_OWNER: {
      return {
        ...state,
        requestingOwner: true,
      };
    }
    case RECEIVE_DOMAIN_OWNER: {
      return {
        ...state,
        requestingOwner: false,
        owner: action.owner,
      };
    }
    case RECEIVE_DOMAIN_COST: {
      return {
        ...state,
        rifCost: action.rifCost,
      };
    }
    default: return state;
  }
};

export default searchReducer;
