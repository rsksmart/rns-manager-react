import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import multilanguage from '../../src/app/multilanguageReducer';

const middleware = [thunk];

const multiLanguageStore = (initReducers, prelodedState) => createStore(
  combineReducers({
    ...initReducers,
    multilanguage,
  }),
  prelodedState,
  applyMiddleware(...middleware),
);

export default multiLanguageStore;
