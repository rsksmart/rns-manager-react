import { addTxNotification, txMined } from './actions';

export const notifyTx = (tx, message, params) => dispatch => {
  dispatch(addTxNotification(tx, message, params));

  const checkInterval = setInterval(() => {
    window.ethereum.sendAsync({
      method: 'eth_getTransactionByHash',
      params: [ tx ],
    }, (err, response) => {
      if (response.result) {
        clearInterval(checkInterval);
        dispatch(txMined(tx));
      }
    });
  }, 2000);
};
