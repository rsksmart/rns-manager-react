import { REQUEST_RESOLVE, RECEIVE_RESOLVE, ERROR_RESOLVE } from "./types";

const intialState = {
  loading: false,
  resolution: null,
  error: null
}

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case REQUEST_RESOLVE: return {
      loading: true,
      resolution: null,
      error: null
    };
    case RECEIVE_RESOLVE: return {
      loading: false,
      resolution: action.resolution,
      error: null
    };
    case ERROR_RESOLVE: return {
      loading: false,
      resolution: null,
      error: action.error
    };
    default: return state;
  }
}

export default reducer;
