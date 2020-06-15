import { TRANSACTION_RECEIPT_FAILED } from '../types';

/**
 * transactionListenerlistens to transactions on the blockchain and returns when
 * a response if given.
 * @param {tx} tx The transaction to listen to
 * @param {func} callback The function to call on success
 * @param {func} failCallBack (Optional) The function to call on fail.
 */
const transactionListener = (tx, callback, failCallBack = () => {}) => {
  const checkInterval = setInterval(() => {
    window.ethereum.sendAsync({
      method: 'eth_getTransactionReceipt',
      params: [tx],
    }, (err, response) => {
      if (response.result) {
        clearInterval(checkInterval);
        return (parseInt(response.result.status, 16) === 1)
          ? callback() : failCallBack(TRANSACTION_RECEIPT_FAILED);
      }
      return false;
    });
  }, 2000);
};

export default transactionListener;
