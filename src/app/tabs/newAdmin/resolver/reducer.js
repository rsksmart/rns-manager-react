import {
  RECEIVE_RESOLVER, REQUEST_RESOLVER, REQUEST_SET_RESOLVER, RECEIVE_SET_RESOLVER,
  ERROR_SET_RESOLVER, WAITING_SET_RESOLVER, CLOSE_MESSAGE, REQUEST_CONTENT,
  RECEIVE_CONTENT, REQUEST_SET_CONTENT, ERROR_SET_CONTENT, CLOSE_SET_CONTENT,
  RECEIVE_SET_CONTENT, REQUEST_SUPPORTED_INTERFACES, ERROR_DECODING_ADDRESS,
  REQUEST_MIGRATE_ADDRESSES, RECEIVE_MIGRATE_ADDRESSES, ERROR_MIGRATE_WITH_ADDRESSES,
  CLEAR_MIGRATE_CONTENT, RECEIVE_SUPPORTED_INTERFACES,
} from './types';

export const initialState = {
  resolverAddr: '',
  resolverName: '',
  isEditing: false,
  isWaiting: false,
  gettingResolver: false,
  successTx: '',
  errorMessage: '',
  content: [],
  migrating: {
    isMigrating: false,
    errors: [],
    migrationComplete: false,
    errorMessage: null,
  },
  gettingContent: false,
};

export const contentInititalState = {
  value: '',
  isRequesting: false,
  isWaiting: false,
  successTx: '',
  errorMessage: '',
  isEmpty: true,
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
      migrating: {
        ...state.migrating,
        errorMessage: '',
      },
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
          isEmpty: action.isEmpty,
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
          errorMessage: '',
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
          isEmpty: action.isEmpty,
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

    case REQUEST_SUPPORTED_INTERFACES: return {
      ...state,
      content: [],
      gettingContent: true,
    };

    case RECEIVE_SUPPORTED_INTERFACES: return {
      ...state,
      gettingContent: false,
    };

    case REQUEST_MIGRATE_ADDRESSES: return {
      ...state,
      isWaiting: true,
      migrating: {
        ...state.migrating,
        isMigrating: true,
        errors: [],
      },
    };
    case RECEIVE_MIGRATE_ADDRESSES: return {
      ...state,
      migrating: {
        ...state.migrating,
        isMigrating: false,
        migrationComplete: true,
      },
    };
    case ERROR_DECODING_ADDRESS: return {
      ...state,
      migrating: {
        ...state.migrating,
        errors: [
          ...state.migrating.errors,
          {
            chainId: action.chainId,
            chainName: action.chainName,
            error: action.errorMessage,
          },
        ],
      },
    };
    case ERROR_MIGRATE_WITH_ADDRESSES: return {
      ...state,
      isWaiting: false,
      migrating: {
        ...state.migrating,
        isMigrating: false,
        errorMessage: action.message,
      },
    };
    case CLEAR_MIGRATE_CONTENT: return {
      ...state,
      migrating: {
        errorMessage: '',
        isMigrating: false,
        errors: [],
        migrationComplete: false,
      },
    };

    default: return state;
  }
};

export default resolverReducer;
