import React from 'react';
import { Switch, Route } from 'react-router';

import {
  HomeTab,
  SearchTab,
  AdminTab,
  StartAuctionTab,
  BidTab,
  UnsealTab,
  FinalizeTab
} from './tabs';

const NoMatch = () => <p>404! Page not found :(</p>

const routes = (
  <Switch>
    <Route exact path='/' component={HomeTab} />
    <Route path='/search' component={SearchTab} />
    <Route path='/admin' component={AdminTab} />
    <Route path='/start' component={StartAuctionTab} />
    <Route path='/bid' component={BidTab} />
    <Route path='/unseal' component={UnsealTab} />
    <Route path='/finalize' component={FinalizeTab} />
    <Route component={NoMatch} />
  </Switch>
);

export default routes;
