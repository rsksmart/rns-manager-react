import { TRANSACTION_ERROR } from './types';

export const txError = message => ({
  type: TRANSACTION_ERROR,
  message
});
