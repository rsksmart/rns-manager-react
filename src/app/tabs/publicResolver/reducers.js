import {
  REQUEST_GET_ADDR, RECEIVE_GET_ADDR, ERROR_GET_ADDR, VIEW_EDIT_ADDR, REQUEST_SET_ADDR, RECEIVE_SET_ADDR, ERROR_SET_ADDR,
  REQUEST_GET_CONTENT, RECEIVE_GET_CONTENT, ERROR_GET_CONTENT, VIEW_EDIT_CONTENT, REQUEST_SET_CONTENT, RECEIVE_SET_CONTENT, ERROR_SET_CONTENT,
} from './types';

const propInitialState = () => ({
  getting: false,
  value: null,
  errorGet: null,
  editOpen: false,
  editting: false,
  responseSet: null,
  setHasError: false
});

const initialState = {
  addr: propInitialState(),
  content: propInitialState()
};

const requestGetProp = (prop) => ({
  ...prop,
  getting: true,
  value: null,
  errorGet: null,
});

const receiveGetProp = (prop, value) => ({
  ...prop,
  getting: false,
  value,
  errorGet: null,
});

const errorGetProp = (prop, error) => ({
  ...prop,
  getting: false,
  value: null,
  errorGet: error.message,
});

const changeEditProp = (prop) => ({
  ...prop,
  editOpen: !prop.editOpen
});

const requestSetProp = (prop) => ({
  ...prop,
  editting: true
});

const receiveSetProp = (prop, response) => ({
  ...prop,
  editting: false,
  responseSet: response,
  errorSet: false
});

const errorSetProp = (prop, error) => ({
  ...prop,
  editting: false,
  responseSet: error.message,
  errorSet: true
});

const publicResolverReducer = (state = initialState, action) => {
  switch (action.type) {
    // addr
    case REQUEST_GET_ADDR: return {
      ...state,
      addr: requestGetProp(state.addr)
    }
    case RECEIVE_GET_ADDR: return {
      ...state,
      addr: receiveGetProp(state.addr, action.addr)
    }
    case ERROR_GET_ADDR: return {
      ...state,
      addr: errorGetProp(state.addr, action.error)
    }
    case VIEW_EDIT_ADDR: return {
      ...state,
      addr: changeEditProp(state.addr)
    }
    case REQUEST_SET_ADDR: return {
      ...state,
      addr: requestSetProp(state.addr)
    }
    case RECEIVE_SET_ADDR: return {
      ...state,
      addr: receiveSetProp(state.addr, action.response)
    }
    case ERROR_SET_ADDR: return {
      ...state,
      addr: errorSetProp(state.addr, action.error)
    }
    // content
    case REQUEST_GET_CONTENT: return {
      ...state,
      content: requestGetProp(state.content)
    }
    case RECEIVE_GET_CONTENT: return {
      ...state,
      content: receiveGetProp(state.content, action.content)
    }
    case ERROR_GET_CONTENT: return {
      ...state,
      content: errorGetProp(state.content, action.error)
    }
    case VIEW_EDIT_CONTENT: return {
      ...state,
      content: changeEditProp(state.content)
    }
    case REQUEST_SET_CONTENT: return {
      ...state,
      content: requestSetProp(state.content)
    }
    case RECEIVE_SET_CONTENT: return {
      ...state,
      content: receiveSetProp(state.content, action.response)
    }
    case ERROR_SET_CONTENT: return {
      ...state,
      content: errorSetProp(state.content, action.error)
    }
    default: return state;
  }
}

export default publicResolverReducer;
