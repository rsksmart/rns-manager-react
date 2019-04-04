import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authReducer from '../auth';
import homeReducer from '../tabs/home';
import searchReducer from '../tabs/search';
import adminReducer from '../tabs/admin';
import startAuctionReducer from '../tabs/startAuction';
import bidReducer from '../tabs/bid';
import unsealReducer from '../tabs/unseal';
import finalizeReducer from '../tabs/finalize';
import publicResolver from '../tabs/publicResolver';
import responseReducer from './responseReducer';
import notificationReducer from '../notifications';

const rootReducer = (history) => combineReducers({
  auth: authReducer,
  home: homeReducer,
  search: searchReducer,
  admin: adminReducer,
  startAuction: startAuctionReducer,
  bid: bidReducer,
  unseal: unsealReducer,
  finalize: finalizeReducer,
  publicResolver: publicResolver,
  response: responseReducer,
  notifications: notificationReducer,
  router: connectRouter(history)
});

export default rootReducer;
