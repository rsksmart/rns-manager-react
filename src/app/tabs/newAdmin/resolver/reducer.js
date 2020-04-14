import {
  RECEIVE_RESOLVER, REQUEST_RESOLVER, REQUEST_SET_RESOLVER, RECEIVE_SET_RESOLVER,
  ERROR_SET_RESOLVER, WAITING_SET_RESOLVER, CLOSE_MESSAGE, REQUEST_CONTENT,
  RECEIVE_CONTENT, REQUEST_SET_CONTENT, ERROR_SET_CONTENT, CLOSE_SET_CONTENT,
  RECEIVE_SET_CONTENT,
} from './types';

const initialState = {
  resolverAddr: '',
  resolverName: '',
  isEditing: false,
  isWaiting: false,
  gettingResolver: false,
  successTx: '',
  errorMessage: '',
  content: [],
};

const contentInititalState = {
  value: '',
  isRequesting: false,
  isWaiting: false,
  successTx: '',
  errorMessage: '',
};

const resolverReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_RESOLVER: return {
      ...state,
      gettingResolver: true,
    };
    case RECEIVE_RESOLVER: return {
      ...state,
      gettingResolver: false,
      resolverAddr: action.resolverAddr,
      resolverName: action.resolverName,
    };

    case REQUEST_SET_RESOLVER: return {
      ...state,
      isEditing: true,
      errorMessage: '',
    };
    case WAITING_SET_RESOLVER: return {
      ...state,
      isWaiting: true,
    };
    case RECEIVE_SET_RESOLVER: return {
      ...state,
      gettingResolver: false,
      resolverAddr: action.resolverAddr,
      resolverName: action.resolverName,
      successTx: action.successTx,
      isEditing: false,
      isWaiting: false,
    };
    case ERROR_SET_RESOLVER: return {
      ...state,
      isEditing: false,
      isWaiting: false,
      errorMessage: action.message,
    };
    case CLOSE_MESSAGE: return {
      ...state,
      errorMessage: '',
      successTx: '',
    };

    case REQUEST_CONTENT: return {
      ...state,
      content: {
        ...state.content,
        [action.contentType]: {
          ...contentInititalState,
          isRequesting: true,
        },
      },
    };
    case RECEIVE_CONTENT: return {
      ...state,
      content: {
        ...state.content,
        [action.contentType]: {
          ...state.content[action.contentType],
          isRequesting: false,
          value: action.value,
        },
      },
    };
    case REQUEST_SET_CONTENT: return {
      ...state,
      content: {
        ...state.content,
        [action.contentType]: {
          ...state.content[action.contentType],
          isWaiting: true,
        },
      },
    };
    case RECEIVE_SET_CONTENT: return {
      ...state,
      content: {
        ...state.content,
        [action.contentType]: {
          ...state.content[action.contentType],
          isWaiting: false,
          value: action.value,
          successTx: action.successTx,
        },
      },
    };
    case ERROR_SET_CONTENT: return {
      ...state,
      content: {
        ...state.content,
        [action.contentType]: {
          ...state.content[action.contentType],
          isWaiting: false,
          errorMessage: action.message,
        },
      },
    };
    case CLOSE_SET_CONTENT: return {
      ...state,
      content: {
        ...state.content,
        [action.contentType]: {
          ...state.content[action.contentType],
          errorMessage: '',
          successTx: '',
        },
      },
    };
    default: return state;
  }
};

export default resolverReducer;
