import {
  REQUEST_REGISTRAR_GET_COST, RECEIVE_REGISTRAR_GET_COST,
  REQUEST_REGISTRAR_COMMIT, RECEIVE_REGISTRAR_COMMIT,
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
