import {
  REQUEST_GET_ADDR, RECEIVE_GET_ADDR, CHANGE_EDIT_ADDR, REQUEST_SET_ADDR, RECEIVE_SET_ADDR,
  REQUEST_GET_CONTENT, RECEIVE_GET_CONTENT, CHANGE_EDIT_CONTENT, REQUEST_SET_CONTENT, RECEIVE_SET_CONTENT,
} from './types';

const propInitialState = () => ({
  getting: false,
  value: null,
  editOpen: false,
  editting: false
});

const initialState = {
  addr: propInitialState(),
  content: propInitialState()
};

const requestGetProp = (prop) => ({
  ...prop,
  getting: true,
  value: null,
});

const receiveGetProp = (prop, value) => ({
  ...prop,
  getting: false,
  value
});

const changeEditProp = (prop) => ({
  ...prop,
  editOpen: !prop.editOpen
});

const requestSetProp = (prop) => ({
  ...prop,
  editting: true
});

const receiveSetProp = (prop) => ({
  ...prop,
  editting: false,
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
    case CHANGE_EDIT_ADDR: return {
      ...state,
      addr: changeEditProp(state.addr)
    }
    case REQUEST_SET_ADDR: return {
      ...state,
      addr: requestSetProp(state.addr)
    }
    case RECEIVE_SET_ADDR: return {
      ...state,
      addr: receiveSetProp(state.addr)
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
    case CHANGE_EDIT_CONTENT: return {
      ...state,
      content: changeEditProp(state.content)
    }
    case REQUEST_SET_CONTENT: return {
      ...state,
      content: requestSetProp(state.content)
    }
    case RECEIVE_SET_CONTENT: return {
      ...state,
      content: receiveSetProp(state.content)
    }
    default: return state;
  }
}

export default publicResolverReducer;
