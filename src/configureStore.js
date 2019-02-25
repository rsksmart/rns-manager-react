import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './app/reducers';

export const history = createBrowserHistory();

const middleware = [ thunk, routerMiddleware(history) ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const configureStore = (prelodedState) => {
  const store = createStore(
    rootReducer(history),
    prelodedState,
    applyMiddleware(...middleware)
  );
  return store;
};

export default configureStore;
