import { addTxConfirmed, txMined } from './actions';

export const confirmedTx = txHash => dispatch => {
  dispatch(addTxConfirmed(txHash));

  const checkInterval = setInterval(() => {
    window.ethereum.sendAsync({
      method: 'eth_getTransactionByHash',
      params: [ txHash ],
    }, (err, response) => {
      if (response.result) {
        clearInterval(checkInterval);
        dispatch(txMined(txHash));
      }
    });
  }, 2000);
};
