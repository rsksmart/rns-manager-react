import { addTxNotification, txMined } from './actions';

export const notifyTx = (tx, message) => dispatch => {
  dispatch(addTxNotification(tx, message));

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
