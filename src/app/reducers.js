import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import homeReducer from './tabs/home/reducers';
import searchReducer from './tabs/search/reducers';
import adminReducer from './tabs/admin/reducers';
import startAuctionReducer from './tabs/startAuction/reducers';
import bidReducer from './tabs/bid/reducers';

const rootReducer = (history) => combineReducers({
  home: homeReducer,
  search: searchReducer,
  admin: adminReducer,
  startAuction: startAuctionReducer,
  bid: bidReducer,
  router: connectRouter(history),
});

export default rootReducer;
