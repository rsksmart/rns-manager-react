import { TRANSACTION_RECEIPT_FAILED } from '../types';

const transactionListener = (tx, callback, failCallBack = () => {}) => (dispatch) => {
  const checkInterval = setInterval(() => {
    window.ethereum.sendAsync({
      method: 'eth_getTransactionReceipt',
      params: [tx],
    }, (err, response) => {
      if (response.result) {
        clearInterval(checkInterval);

        if (parseInt(response.result.status, 16) === 1) {
          return dispatch(callback());
        }
        return failCallBack(TRANSACTION_RECEIPT_FAILED);
      }
      return false;
    });
  }, 2000);
};

export default transactionListener;
