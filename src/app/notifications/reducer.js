import { ADD_NOTIFICATION, VIEW_NOTIFICATION, TX_MINED } from './types';

const initialState = [];

var notificationId = 0;

/*
error:
- message
tx:
- message
- mined
- txHash
*/

const newNotification = notification => ({
  ...notification,
  id: notificationId++,
  viewed: false
})

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
