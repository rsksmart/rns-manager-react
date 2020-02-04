import {
  REQUEST_REGISTRAR_GET_COST, RECEIVE_REGISTRAR_GET_COST,
  REQUEST_REGISTRAR_COMMIT, RECEIVE_REGISTRAR_COMMIT, ERROR_REGISTRAR_COMMIT,
  REQUEST_REGISTRAR_REVEAL_COMMIT, RECEIVE_REGISTRAR_REVEAL_COMMIT,
  RECEIVE_CAN_REVEAL_COMMIT, ERROR_REGISTRAR_REVEAL_COMMIT, SALT_NOT_FOUND,
  REGISTRAR_COMMIT_CONFIRMED, REVEAL_COMMIT_CONFIRMED, RESET_REGISTRAR_STATE,
} from './types';

export const requestGetCost = duration => ({
  type: REQUEST_REGISTRAR_GET_COST,
  duration,
});

export const receiveGetCost = (rifCost, hasBalance) => ({
  type: RECEIVE_REGISTRAR_GET_COST,
  rifCost,
  hasBalance,
});

export const requestCommitRegistrar = () => ({
  type: REQUEST_REGISTRAR_COMMIT,
});

export const receiveCommitRegistrar = (hash, commitConfirmed) => ({
  type: RECEIVE_REGISTRAR_COMMIT,
  hash,
  commitConfirmed,
});

export const errorRegistrarCommit = () => ({
  type: ERROR_REGISTRAR_COMMIT,
});

export const requestRevealCommit = () => ({
  type: REQUEST_REGISTRAR_REVEAL_COMMIT,
});

export const receiveRevealCommit = () => ({
  type: RECEIVE_REGISTRAR_REVEAL_COMMIT,
});

export const errorRevealCommit = () => ({
  type: ERROR_REGISTRAR_REVEAL_COMMIT,
});

export const receiveCanRevealCommit = canReveal => ({
  type: RECEIVE_CAN_REVEAL_COMMIT,
  canReveal,
});

export const saltNotFound = () => ({
  type: SALT_NOT_FOUND,
});

export const commitTxMined = () => ({
  type: REGISTRAR_COMMIT_CONFIRMED,
});

export const revealTxMined = () => ({
  type: REVEAL_COMMIT_CONFIRMED,
});

export const resetRegistrarState = () => ({
  type: RESET_REGISTRAR_STATE,
});
