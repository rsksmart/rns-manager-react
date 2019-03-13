import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authReducer from './auth/reducers';
import homeReducer from './tabs/home/reducers';
import searchReducer from './tabs/search/reducers';
import adminReducer from './tabs/admin/reducers';
import startAuctionReducer from './tabs/startAuction/reducers';
import bidReducer from './tabs/bid/reducers';
import unsealReducer from './tabs/unseal/reducers';
import finalizeReducer from './tabs/finalize/reducers';
import publicResolver from './tabs/publicResolver/reducers';

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
  router: connectRouter(history),
});

export default rootReducer;
