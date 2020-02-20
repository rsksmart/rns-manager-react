import { requestBrowserNotifications, recieveBrowserNotifications } from './actions';
import { DENIED, GRANTED } from './types';

export const checkBrowserNotifications = (dispatch) => {
  dispatch(requestBrowserNotifications());

  if (!('Notification' in window) || Notification.permission === DENIED) {
    return dispatch(recieveBrowserNotifications(DENIED));
  }

  if (Notification.permission === GRANTED) {
    return dispatch(recieveBrowserNotifications(GRANTED));
  }

  if (Notification.permission !== DENIED) {
    Notification.requestPermission()
      .then((permission) => {
        if (permission === GRANTED) {
          return dispatch(recieveBrowserNotifications(GRANTED));
        }
        return dispatch(recieveBrowserNotifications(DENIED));
      });
  }

  return dispatch(recieveBrowserNotifications(DENIED));
};

export const sendNotification = (permission, message) => {
  if (permission !== GRANTED) {
    checkBrowserNotifications();
  }

  Notification(message);
};
