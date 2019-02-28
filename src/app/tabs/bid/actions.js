import {
  REQUEST_BID, RECEIVE_BID, ERROR_BID
} from './types';

export const requestBid = (domain, value) => ({
  type: REQUEST_BID,
  domain,
  value
});

export const receiveBid = response => ({
  type: RECEIVE_BID,
  response
});

export const errorBid = error => ({
  type: ERROR_BID,
  error
});
