import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authReducer from './auth';
import notificationReducer from './notifications';

import tabReducers from './tabs';

const rootReducer = (history) => combineReducers({
  ...tabReducers,
  auth: authReducer,
  notifications: notificationReducer,
  router: connectRouter(history)
});

export default rootReducer;
