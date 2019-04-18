import { ADD_NOTIFICATION, VIEW_NOTIFICATION, TX_MINED, notificationTypes } from './types';
import { NotificationListContainer } from './containers';

const initialState = [];

var notificationId = 0;

const newNotification = notification => {
  const newNotification = {
    ...notification,
    id: notificationId++,
    mined: false
  };

  return NotificationListContainer.type === notificationTypes.TX ? { ...newNotification, params: notification.params, viewed: false } : newNotification;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION: return [
      ...state,
      newNotification(action.notification)
    ];
    case VIEW_NOTIFICATION: return state.map(n => n.id === action.id ? { ...n, viewed: true } : n);
    case TX_MINED: return state.map(n => n.tx === action.txHash ? { ...n, mined: true } : n);
    default: return state;
  }
}

export default reducer;
