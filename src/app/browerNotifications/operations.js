import { requestBrowserNotifications, recieveBrowserNotifications } from './actions';
import { DENIED, GRANTED } from './types';
import configureStore from '../../configureStore';

export const checkBrowserNotifications = () => (dispatch) => {
  dispatch(requestBrowserNotifications());

  if (!('Notification' in window) || Notification.permission === DENIED) {
    return dispatch(recieveBrowserNotifications(DENIED));
  }

  if (Notification.permission === GRANTED) {
    return dispatch(recieveBrowserNotifications(GRANTED));
  }

  Notification.requestPermission()
    .then(permission => dispatch(recieveBrowserNotifications(permission)));
};

export const getLanguageString = (string) => {
  const store = configureStore();
  const state = store.getState();
  const strings = state.multilanguage.languages[state.multilanguage.currentLanguageCode];
  return strings[string];
};

export const sendBrowserNotification = (title, string) => {
  if (Notification.permission === DENIED) {
    return;
  }

  const options = {
    icon: '/assets/favicons/favicon-32x32.png',
    body: getLanguageString(string),
  };

  const userNotification = new Notification(title, options);
  setTimeout(userNotification.close.bind(userNotification), 8000);
};
