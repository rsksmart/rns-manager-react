import homeReducer from './tabs/home/reducers';
import searchReducer from './tabs/search/reducers';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

const rootReducer = (history) => combineReducers({
  home: homeReducer,
  search: searchReducer,
  router: connectRouter(history)
});

export default rootReducer;
