import {
  REQUEST_BID, RECEIVE_BID, ERROR_BID
} from './types';

export const requestBid = () => ({
  type: REQUEST_BID,
});

export const receiveBid = response => ({
  type: RECEIVE_BID,
  response
});

export const errorBid = error => ({
  type: ERROR_BID,
  error
});
