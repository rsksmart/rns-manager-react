import React from 'react';
import { Switch, Route } from 'react-router';

import { HomeTab, SearchTab, AdminTab, StartAuctionTab } from './tabs';

const NoMatch = () => <p>404! Page not found :(</p>

const routes = (
  <Switch>
    <Route exact path='/' component={HomeTab} />
    <Route path='/search' component={SearchTab} />
    <Route path='/admin' component={AdminTab} />
    <Route path='/start' component={StartAuctionTab} />
    <Route component={NoMatch} />
  </Switch>
);

export default routes;
