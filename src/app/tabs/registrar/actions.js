import {
  REQUEST_REGISTRAR_GET_COST, RECEIVE_REGISTRAR_GET_COST,
  REQUEST_REGISTRAR_COMMIT, RECEIVE_REGISTRAR_COMMIT, ERROR_REGISTRAR_COMMIT,
  REQUEST_REGISTRAR_REVEAL_COMMIT, RECEIVE_REGISTRAR_REVEAL_COMMIT,
  RECEIVE_CAN_REVEAL_COMMIT,
} from './types';

export const requestGetCost = duration => ({
  type: REQUEST_REGISTRAR_GET_COST,
  duration,
});

export const receiveGetCost = rifCost => ({
  type: RECEIVE_REGISTRAR_GET_COST,
  rifCost,
});

export const requestCommitRegistrar = () => ({
  type: REQUEST_REGISTRAR_COMMIT,
});

export const receiveCommitRegistrar = hash => ({
  type: RECEIVE_REGISTRAR_COMMIT,
  hash,
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

export const receiveCanRevealCommit = canReveal => ({
  type: RECEIVE_CAN_REVEAL_COMMIT,
  canReveal,
});
