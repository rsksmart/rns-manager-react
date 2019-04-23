import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore, { history } from './configureStore';
import App from './app';
import * as serviceWorker from './serviceWorker';

import './style.css';

const store = configureStore();
console.log(store.getState())

render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
