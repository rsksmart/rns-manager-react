import { REQUEST_BID, RECEIVE_BID } from './types';

export const requestBid = () => ({
  type: REQUEST_BID,
});

export const receiveBid = () => ({
  type: RECEIVE_BID
});
