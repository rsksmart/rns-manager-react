import {
  REQUEST_GET_ADDR, RECEIVE_GET_ADDR, ERROR_GET_ADDR,
  REQUEST_GET_CONTENT, RECEIVE_GET_CONTENT, ERROR_GET_CONTENT
} from './types';

const propInitialState = () => ({
  getting: false,
  value: null,
  error: null
});

const initialState = {
  addr: propInitialState(),
  content: propInitialState()
};

const requestGetProp = () => ({
  getting: true,
  value: null,
  error: null
});

const receiveGetProp = (value) => ({
  getting: false,
  value,
  error: null
});

const errorGetProp = (error) => ({
  getting: false,
  value: null,
  error: error.message
})

const publicResolverReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_GET_ADDR: return {
      ...state,
      addr: requestGetProp()
    }
    case RECEIVE_GET_ADDR: return {
      ...state,
      addr: receiveGetProp(action.addr)
    }
    case ERROR_GET_ADDR: return {
      ...state,
      addr: errorGetProp(action.error)
    }
    case REQUEST_GET_CONTENT: return {
      ...state,
      addr: requestGetProp()
    }
    case RECEIVE_GET_CONTENT: return {
      ...state,
      addr: receiveGetProp(action.content)
    }
    case ERROR_GET_CONTENT: return {
      ...state,
      addr: errorGetProp(action.error)
    }
    default: return state;
  }
}

export default publicResolverReducer;
