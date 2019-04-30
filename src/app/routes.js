import React from 'react';
import { Switch, Route } from 'react-router';
import {
  HomeTab,
  SetUpTab,
  NoMetamaskTab,
  ResolveTab,
  SearchTab,
  StartAuctionTab,
  BidTab,
  UnsealTab,
  FinalizeTab,
  AdminTab,
  PublicResolverTab,
  NotificationTab,
  UserTab
} from './tabs';
import { connect } from 'react-redux';

const NoMatch = () => <p>404! Page not found :(</p>;

const Routes = props => {
  const { viewMyCrypto } = props;

  return (
    <Switch>
      <Route exact path='/' component={HomeTab} />
      <Route path ='/setup' component={SetUpTab} />
      {
        !window.ethereum && !viewMyCrypto && <Route component={NoMetamaskTab} />
      }
      <Route path='/user' component={viewMyCrypto ? NoMetamaskTab : UserTab} />
      <Route path='/search' component={SearchTab} />
      <Route path='/resolve' component={ResolveTab} />
      <Route path='/start' component={StartAuctionTab} />
      <Route path='/bid' component={BidTab} />
      <Route path='/unseal' component={UnsealTab} />
      <Route path='/finalize' component={FinalizeTab} />
      <Route path='/admin' component={AdminTab} />
      <Route path='/publicResolver' component={PublicResolverTab} />
      <Route path='/notifications' component={NotificationTab} />
      <Route path='/wallets' component={NoMetamaskTab} />
      <Route component={NoMatch} />
    </Switch>
  );
};

const mapStateToProps = state => ({
  viewMyCrypto: state.user.viewMyCrypto
});

export default connect(mapStateToProps)(Routes);
