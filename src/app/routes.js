import React from 'react';
import propTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router';
import { connect } from 'react-redux';
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
  MultiChainResolverTab,
  NotificationTab,
  UserTab,
  AdminMyCryptoTab,
} from './tabs';


const NoMatch = () => <p>404! Page not found :(</p>;

const Routes = (props) => {
  const { viewMyCrypto } = props;

  return (
    <Switch>
      <Route exact path="/" component={HomeTab} />
      <Route path="/setup" component={SetUpTab} />
      <Route path="/search" component={SearchTab} />
      <Route path="/resolve" component={ResolveTab} />
      {
        !window.ethereum && !viewMyCrypto && <Route component={NoMetamaskTab} />
      }
      <Route path="/user" component={viewMyCrypto ? NoMetamaskTab : UserTab} />
      <Route path="/start" component={StartAuctionTab} />
      <Route path="/bid" component={BidTab} />
      <Route path="/unseal" component={UnsealTab} />
      <Route path="/finalize" component={FinalizeTab} />
      <Route path="/admin" component={viewMyCrypto ? AdminMyCryptoTab : AdminTab} />
      <Route path="/publicResolver" component={viewMyCrypto ? AdminMyCryptoTab : PublicResolverTab} />
      <Route path="/multiChainResolver" component={viewMyCrypto ? NoMatch : MultiChainResolverTab} />
      <Route path="/notifications" component={NotificationTab} />
      <Route path="/wallets" component={NoMetamaskTab} />
      <Route component={NoMatch} />
    </Switch>
  );
};

Routes.propTypes = {
  viewMyCrypto: propTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  viewMyCrypto: state.user.viewMyCrypto,
});

export default withRouter(connect(mapStateToProps)(Routes));
