import { combineReducers } from 'redux';
import authReducer from './auth';
import notificationReducer from './notifications';
import browserNotificationsReducer from './browerNotifications';
import multilanguage from './multilanguageReducer';

import newAdmin from './tabs/newAdmin/reducer';
import registrar from './tabs/registrar/reducer';
import resolve from './tabs/resolve/reducer';
import search from './tabs/search/reducer';

const rootReducer = () => combineReducers({
  auth: authReducer,
  browserNotifications: browserNotificationsReducer,
  multilanguage,
  newAdmin,
  notifications: notificationReducer,
  registrar,
  resolve,
  search,
});

export default rootReducer;
