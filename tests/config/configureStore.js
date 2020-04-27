import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import multilanguage from '../../src/app/multilanguageReducer';

const middleware = [thunk];

export const configureStore = (initReducers, prelodedState) => createStore(
  combineReducers({
    ...initReducers,
    multilanguage,
  }),
  prelodedState,
  applyMiddleware(...middleware),
);

export default configureStore;
