import {
  WAITING_SET_CHAIN_ADDRESS, ERROR_SET_CHAIN_ADDRESS, RECEIVE_SET_CHAIN_ADDRESS,
  REQUEST_SET_CHAIN_ADDRESS, CLOSE_SET_CHAIN_ADDRESS, RECEIVE_CHAIN_ADDRESS,
} from './types';

const initialState = {
  newChainAddress: '',
  chainAddresses: [],
};

const chainAddressInitialState = {
  chainId: '',
  address: '',
  isEditing: false,
  isWaiting: false,
  isSuccess: false,
  isError: false,
  successTx: '',
  errorMessage: '',
};

const resolverReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_SET_CHAIN_ADDRESS: return {
      ...state,
      newChainAddress: action.chainName,
      chainAddresses: {
        ...state.chainAddresses,
        [action.chainName]: {
          ...state.chainAddresses[action.chainName],
          isEditing: true,
        },
      },
    };

    case WAITING_SET_CHAIN_ADDRESS: return {
      ...state,
      chainAddresses: {
        ...state.chainAddresses,
        [action.chainName]: {
          ...state.chainAddresses[action.chainName],
          isWaiting: true,
        },
      },
    };

    case ERROR_SET_CHAIN_ADDRESS: return {
      ...state,
      chainAddresses: {
        ...state.chainAddresses,
        [action.chainName]: {
          ...state.chainAddresses[action.chainName],
          isError: true,
          isEditing: false,
          isWaiting: false,
          errorMessage: action.message,
        },
      },
    };

    // to be used when editing:
    case RECEIVE_SET_CHAIN_ADDRESS: return {
      ...state,
      chainAddresses: {
        ...state.chainAddresses,
        [action.chainName]: {
          ...state.chainAddresses[action.chainName],
          address: action.address,
          chainId: action.chainId,
          successTx: action.resultTx,
          isEditing: false,
          isWaiting: false,
          isSuccess: true,
        },
      },
    };

    // to be used when fetching
    case RECEIVE_CHAIN_ADDRESS: return {
      ...state,
      chainAddresses: {
        ...state.chainAddresses,
        [action.chainName]: {
          ...state.chainAddresses[action.chainName],
          address: action.address,
          chainId: action.chainId,
          isSuccess: false,
        },
      },
    };

    case CLOSE_SET_CHAIN_ADDRESS: return {
      ...state,
      newChainAddress: '',
      chainAddresses: {
        ...state.chainAddresses,
        [action.chainName]: {
          ...state.chainAddresses[action.chainName],
          isError: false,
          isSuccess: false,
          successTx: '',
          errorMessage: '',
        },
      },
    };
    default: return state;
  }
};

export default resolverReducer;
