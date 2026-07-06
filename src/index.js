import React from 'react';
import { createRoot } from 'react-dom/client';
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

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App history={history} />
    </Provider>
  </React.StrictMode>,
);

serviceWorker.unregister();
