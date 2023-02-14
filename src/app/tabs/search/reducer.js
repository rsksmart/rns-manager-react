import {
  REQUEST_DOMAIN_STATE, RECEIVE_DOMAIN_STATE, BLOCKED_DOMAIN, CLEAR_DOMAIN_STATE,
  REQUEST_DOMAIN_OWNER, RECEIVE_DOMAIN_OWNER, RECEIVE_DOMAIN_COST, REQUEST_DOMAIN_COST,
  VALIDATION_MESSAGE, SET_MIN_MAX_DURATION,
} from './types';

// TODO: check initial state
export const initialState = {
  domain: undefined,
  owned: undefined,
  owner: undefined,
  domainStateLoading: false,
  blocked: undefined,
  requestingOwner: false,
  requestingCost: false,
  rifCost: 0,
  validationMessage: '',
  minDuration: 3,
  maxDuration: 10,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_DOMAIN_STATE: {
      return {
        ...state,
        domain: action.domain,
        domainStateLoading: true,
      };
    }
    case RECEIVE_DOMAIN_STATE: {
      return {
        ...state,
        owned: action.owned,
        domainStateLoading: false,
        requestingOwner: false,
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
    case REQUEST_DOMAIN_COST: {
      return {
        ...state,
        requestingCost: true,
      };
    }
    case RECEIVE_DOMAIN_COST: {
      return {
        ...state,
        requestingCost: false,
        rifCost: action.rifCost,
      };
    }
    case CLEAR_DOMAIN_STATE: {
      return {
        ...initialState,
      };
    }
    case VALIDATION_MESSAGE: {
      return {
        ...state,
        validationMessage: action.validationMessage,
        domainStateLoading: false,
        requestingCost: false,
        domain: undefined,
      };
    }
    case SET_MIN_MAX_DURATION: {
      return {
        ...state,
        minDuration: action.minDuration,
        maxDuration: action.maxDuration,
      };
    }
    default: return state;
  }
};

export default searchReducer;
