import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore, { history } from './configureStore';
import App from './app';
import * as serviceWorker from './serviceWorker';

import './assets/css/main.css';
import './assets/css/theming.css';
import './assets/css/ReplaceBootstrap.css';
import './assets/css/OverwriteBootstrap.css';
import './assets/css/sass/_index.scss';

const store = configureStore();

render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
