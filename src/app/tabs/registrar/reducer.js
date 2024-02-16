import {
  REQUEST_REGISTRAR_GET_COST, RECEIVE_REGISTRAR_GET_COST,
  REQUEST_REGISTRAR_COMMIT, RECEIVE_REGISTRAR_COMMIT, ERROR_REGISTRAR_COMMIT,
  REQUEST_REGISTRAR_REVEAL_COMMIT, RECEIVE_REGISTRAR_REVEAL_COMMIT,
  RECEIVE_CAN_REVEAL_COMMIT, ERROR_REGISTRAR_REVEAL_COMMIT, OPTIONS_NOT_FOUND,
  REGISTRAR_COMMIT_CONFIRMED, REVEAL_COMMIT_CONFIRMED, RESET_REGISTRAR_STATE,
  REQUEST_CONVERSION_RATE, RECEIVE_CONVERSION_RATE, TOGGLE_SETUP_ADDRESS, ERROR_CONVERSION_RATE,
  CLOSE_REGISTRATION_ERROR, REQUEST_CHECK_COMMIT_REGISTRAR,
  REQUEST_CHECK_COMMITMENT_REQUIRED,
  RECEIVE_CHECK_COMMITMENT_REQUIRED,
  REQUEST_HAS_ENOUGH_RIF, RECEIVE_HAS_ENOUGH_RIF, ERROR_NOT_ENOUGH_RIF,
} from './types';

const initialState = {
  gettingCost: false,
  committing: false,
  committed: false,
  hash: null,
  revealing: false,
  revealed: false,
  waiting: false,
  canReveal: false,
  commitConfirmed: null,
  revealConfirmed: false,
  gettingConversionRate: false,
  conversionRate: null,
  setupAddr: true,
  isCommitmentRequired: true,
  checkingIfCommitmentIsRequired: false,
  errorMessage: '',
  successTx: '',
  hasEnoughRIF: false,
  gettingHasEnoughRIF: false,
};
const registrar = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_CHECK_COMMITMENT_REQUIRED: return {
      ...state,
      checkingIfCommitmentIsRequired: true,
    };
    case RECEIVE_CHECK_COMMITMENT_REQUIRED: return {
      ...state,
      checkingIfCommitmentIsRequired: false,
      isCommitmentRequired: action.isCommitmentRequired,
      canReveal: !action.isCommitmentRequired,
    };
    case REQUEST_REGISTRAR_GET_COST: return {
      ...state,
      gettingCost: true,
      duration: action.duration,
    };
    case RECEIVE_REGISTRAR_GET_COST: return {
      ...state,
      gettingCost: false,
      rifCost: action.rifCost,
    };
    case REQUEST_REGISTRAR_COMMIT: return {
      ...state,
      committing: true,
      errorMessage: '',
    };
    case REQUEST_CHECK_COMMIT_REGISTRAR: return {
      ...state,
      committing: true,
    };
    case RECEIVE_REGISTRAR_COMMIT: return {
      ...state,
      committing: false,
      committed: true,
      waiting: true,
      hash: action.hash,
      commitConfirmed: action.commitConfirmed || null,
    };
    case ERROR_REGISTRAR_COMMIT: return {
      ...state,
      committing: false,
      committed: false,
      waiting: false,
      hash: null,
      errorMessage: action.message,
    };
    case REQUEST_REGISTRAR_REVEAL_COMMIT: return {
      ...state,
      revealing: true,
      errorMessage: '',
    };
    case RECEIVE_REGISTRAR_REVEAL_COMMIT: return {
      ...state,
      revealing: false,
      revealed: true,
    };
    case ERROR_REGISTRAR_REVEAL_COMMIT: return {
      ...state,
      revealing: false,
      revealed: false,
      errorMessage: action.message,
    };
    case RECEIVE_CAN_REVEAL_COMMIT: return {
      ...state,
      canReveal: action.canReveal,
      waiting: !action.canReveal,
    };
    case REGISTRAR_COMMIT_CONFIRMED: return {
      ...state,
      commitConfirmed: true,
    };
    case REVEAL_COMMIT_CONFIRMED: return {
      ...state,
      revealConfirmed: true,
      successTx: action.successTx,
    };
    case OPTIONS_NOT_FOUND: return {
      ...state,
      ...state.conversionRate,
      ...initialState,
      errorMessage: state.errorMessage,
    };
    case REQUEST_CONVERSION_RATE: return {
      ...state,
      gettingConversionRate: true,
    };
    case RECEIVE_CONVERSION_RATE: return {
      ...state,
      conversionRate: action.conversionRate,
      gettingConversionRate: false,
    };
    case ERROR_CONVERSION_RATE: return {
      ...state,
      gettingConversionRate: false,
    };
    case TOGGLE_SETUP_ADDRESS: return {
      ...state,
      setupAddr: action.setupAddr,
    };
    case CLOSE_REGISTRATION_ERROR: return {
      ...state,
      errorMessage: '',
    };
    case REQUEST_HAS_ENOUGH_RIF: return {
      ...state,
      gettingHasEnoughRIF: true,
    };
    case RECEIVE_HAS_ENOUGH_RIF: return {
      ...state,
      hasEnoughRIF: action.hasEnoughRIF,
      gettingHasEnoughRIF: false,
    };
    case ERROR_NOT_ENOUGH_RIF: return {
      ...state,
      errorMessage: 'Insufficient RIF balance',
    };
    case RESET_REGISTRAR_STATE:
      return initialState;
    default: return state;
  }
};

export default registrar;
