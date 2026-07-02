import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from './app/reducers';

export const history = createBrowserHistory();

const middleware = [thunk, routerMiddleware(history)];

if (import.meta.env.DEV) {
  middleware.push(createLogger());
}

const configureStore = (prelodedState) => {
  const store = createStore(
    rootReducer(history),
    prelodedState,
    applyMiddleware(...middleware),
  );
  return store;
};

export default configureStore;
