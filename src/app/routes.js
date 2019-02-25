import React from 'react';
import { Switch, Route } from 'react-router';
import { Header } from './components';

import { HomeTab } from './tabs';

const NoMatch = () => <p>404! Page not found :(</p>

const routes = (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={HomeTab} />
      <Route component={NoMatch} />
    </Switch>
  </div>
);

export default routes;
