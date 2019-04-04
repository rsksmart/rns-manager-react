import { notificationTypes, ADD_NOTIFICATION, VIEW_NOTIFICATION, TX_MINED } from './types';

export const addTxNotification = (tx, message) => ({
  type: ADD_NOTIFICATION,
  notification: {
    type: notificationTypes.TX,
    tx,
    message,
    mined: false
  }
});

export const notifyError = message => ({
  type: ADD_NOTIFICATION,
  notification: {
    type: notificationTypes.ERROR,
    message
  }
})

export const viewNotification = id => ({
  type: VIEW_NOTIFICATION,
  id
});

export const txMined = txHash => ({
  type: TX_MINED,
  txHash
});
