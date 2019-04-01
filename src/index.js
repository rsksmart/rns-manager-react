import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './app';
import 'bootstrap/dist/css/bootstrap.css';
import * as serviceWorker from './serviceWorker';
import configureStore, { history } from './configureStore';

const store = configureStore();

render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
