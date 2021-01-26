import { addTxNotification, txMined } from './actions';


export const notifyTx = (tx, message, params, callback) => (dispatch) => {
  dispatch(addTxNotification(tx, message, params));

  const checkInterval = setInterval(() => {
    window.rLogin.sendAsync({
      method: 'eth_getTransactionByHash',
      params: [tx],
    }, (err, response) => {
      if (response.result.blockNumber) {
        clearInterval(checkInterval);
        dispatch(txMined(tx));
        if (callback) dispatch(callback());
      }
    });
  }, 2000);
};

export default notifyTx;
