import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore, { history } from './configureStore';
import App from './app';
import * as serviceWorker from './serviceWorker';
import ReactGA from 'react-ga';

import './style.css';
import './index.css';

const store = configureStore();

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize('UA-127960783-4');

  history.listen(function (location) {
    window.ga('set', 'page', location.pathname + location.search);
    window.ga('send', 'pageview');
  });
}

render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
