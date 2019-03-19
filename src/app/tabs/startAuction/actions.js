import { REQUEST_START_AUCTION, RECEIVE_START_AUCTION } from './types';

export const requestStartAuction = () => ({
  type: REQUEST_START_AUCTION,
});

export const receiveStartAuction = () => ({
  type: RECEIVE_START_AUCTION
});
