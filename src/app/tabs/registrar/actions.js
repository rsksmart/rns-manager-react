import { REQUEST_GET_COST, RECEIVE_GET_COST } from './types';

export const requestGetCost = () => ({
  type: REQUEST_GET_COST,
});

export const receiveGetCost = rifCost => ({
  type: RECEIVE_GET_COST,
  rifCost,
});
