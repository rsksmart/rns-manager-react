import { TRANSACTION_RECEIPT_FAILED } from '../types';

/**
 * Transaction Listener
 * @param {reciept} tx The TX to listen to on the blockchain
 * @param {function} callback A function to be called on a Successful TX
 * @param {array} successCallbackParams Parameters to be sent with successful callback
 * @param {function} failCallback A function to be called on fail
 * @param {array} failCallbackParams Parameters to be set with failed callback
 */
const transactionListener = (
  tx, callback, successCallbackParams, failCallback, failCallbackParams,
) => (dispatch) => {
  const checkInterval = setInterval(() => {
    window.rLogin.sendAsync({
      method: 'eth_getTransactionReceipt',
      params: [tx],
    }, (err, response) => {
      if (response.result) {
        clearInterval(checkInterval);

        return (parseInt(response.result.status, 16) === 1)
          ? dispatch(callback({ ...successCallbackParams, resultTx: tx }))
          : dispatch(failCallback({
            ...failCallbackParams, errorReason: TRANSACTION_RECEIPT_FAILED,
          }));
      }
      return false;
    });
  }, 2000);
};

export default transactionListener;
