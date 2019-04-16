import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import tabReducers from './tabs';
import authReducer from './auth';
import notificationReducer from './notifications';

const rootReducer = (history) => combineReducers({
  ...tabReducers,
  auth: authReducer,
  notifications: notificationReducer,
  router: connectRouter(history)
});

export default rootReducer;
