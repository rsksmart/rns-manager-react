import homeReducer from './tabs/home/reducers';
import searchReducer from './tabs/search/reducers';
import adminReducer from './tabs/admin/reducers';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

const rootReducer = (history) => combineReducers({
  home: homeReducer,
  search: searchReducer,
  admin: adminReducer,
  router: connectRouter(history)
});

export default rootReducer;
