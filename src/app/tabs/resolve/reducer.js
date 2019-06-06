import * as types from './types';

const intialState = {
  loading: false,
  error: null,
  supportedInterfaces: [],
  resolverAddress: null,
  addr: {
    loading: false,
    value: null,
    error: null
  },
  chainAddr: {
    loading: false,
    value: null,
    error: null
  }
}

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case types.REQUEST_RESOLVE: return {
      loading: true,
      error: null,
      supportedInterfaces: [],
      resolverAddress: null,
      addr: {
        loading: false,
        value: null,
        error: null
      },
      chainAddr: {
        loading: false,
        value: null,
        error: null
      }
    };
    case types.RECEIVE_RESOLVE: return {
      ...state,
      loading: false,
    };
    case types.ERROR_RESOLVE: return {
      ...state,
      loading: false,
      error: action.error
    };
    case types.RECEIVE_RESOLVER_ADDRESS: return {
      ...state,
      resolverAddress: action.resolverAddress
    };
    case types.RECEIVE_SUPPORTED_INTERFACE: return {
      ...state,
      supportedInterfaces: [...state.supportedInterfaces, action.supportedInterface]
    };
    case types.REQUEST_RESOLVE_ADDR: return {
      ...state,
      addr: {
        loading: true,
        value: null,
        error: null
      }
    };
    case types.RECEIVE_RESOLVE_ADDR: return {
      ...state,
      addr: {
        loading: false,
        value: action.addr,
        error: null
      }
    };
    case types.ERROR_RESOLVE_ADDR: return {
      ...state,
      addr: {
        loading: false,
        value: null,
        error: action.error
      }
    };
    case types.REQUEST_RESOLVE_CHAIN_ADDR: return {
      ...state,
      chainAddr: {
        loading: true,
        value: null,
        error: null
      }
    };
    case types.RECEIVE_RESOLVE_CHAIN_ADDR: return {
      ...state,
      chainAddr: {
        loading: false,
        value: action.chainAddr,
        error: null
      }
    };
    case types.ERROR_RESOLVE_CHAIN_ADDR: return {
      ...state,
      chainAddr: {
        loading: false,
        value: null,
        error: action.error
      }
    };
    default: return state;
  }
}

export default reducer;
