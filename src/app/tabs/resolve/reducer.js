import { REQUEST_RESOLVE, RECEIVE_RESOLVE, ERROR_RESOLVE, REQUEST_CHAIN_RESOLVE, ERROR_CHAIN_RESOLVE, RECEIVE_CHAIN_RESOLVE } from "./types";

const intialState = {
  loading: false,
  resolution: null,
  resolver: null,
  supportsChainAddr: false,
  error: null,
  chainAddrLoading: false,
  chainAddrResolution: null,
  chainAddrError: null
}

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case REQUEST_RESOLVE: return {
      ...state,
      loading: true,
      resolution: null,
      resolver: null,
      error: null
    };
    case RECEIVE_RESOLVE: return {
      ...state,
      loading: false,
      resolution: action.resolution,
      resolver: action.resolverAddress,
      supportsChainAddr: action.supportsChainAddr,
      error: null
    };
    case ERROR_RESOLVE: return {
      ...state,
      loading: false,
      resolution: null,
      resolver: null,
      error: action.error
    };
    case REQUEST_CHAIN_RESOLVE: return {
      ...state,
      chainAddrLoading: true,
      chainAddrResolution: null,
      chainAddrError: null
    };
    case RECEIVE_CHAIN_RESOLVE: return {
      ...state,
      chainAddrLoading: false,
      chainAddrResolution: action.chainAddr,
      chainAddrError: null
    };
    case ERROR_CHAIN_RESOLVE: return {
      ...state,
      chainAddrLoading: false,
      chainAddrResolution: null,
      chainAddrError: action.error
    };
    default: return state;
  }
}

export default reducer;
