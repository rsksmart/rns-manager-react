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
  RegistrarTab,
  AdminTab,
  PublicResolverTab,
  MultiChainResolverTab,
  NotificationTab,
  UserTab,
  AdminMyCryptoTab,
  RenewTab,
  ErrorTab,
  StringResolverTab,
} from './tabs';

const NoMatch = () => <p>404! Page not found :(</p>;

const Routes = (props) => {
  const { viewMyCrypto, networkMatch, walletUnlocked } = props;

  const notLoggedIn = (!window.ethereum && !viewMyCrypto) || !networkMatch || !walletUnlocked;

  return (
    <Switch>
      <Route exact path="/" component={HomeTab} />
      <Route path="/setup" component={SetUpTab} />
      <Route path="/search" component={SearchTab} />
      <Route path="/resolve" component={ResolveTab} />
      {
        notLoggedIn && <Route component={ErrorTab} />
      }
      <Route path="/user" component={viewMyCrypto ? NoMetamaskTab : UserTab} />
      <Route path="/registrar" component={RegistrarTab} />
      <Route path="/admin" component={viewMyCrypto ? AdminMyCryptoTab : AdminTab} />
      <Route path="/publicResolver" component={viewMyCrypto ? AdminMyCryptoTab : PublicResolverTab} />
      <Route path="/multiChainResolver" component={viewMyCrypto ? NoMatch : MultiChainResolverTab} />
      <Route path="/stringResolver" component={viewMyCrypto ? NoMatch : StringResolverTab} />
      <Route path="/notifications" component={NotificationTab} />
      <Route path="/wallets" component={NoMetamaskTab} />
      <Route path="/renew" component={RenewTab} />
      <Route component={NoMatch} />
    </Switch>
  );
};

Routes.defaultProps = {
  networkMatch: false,
  walletUnlocked: false,
};

Routes.propTypes = {
  viewMyCrypto: propTypes.bool.isRequired,
  networkMatch: propTypes.bool,
  walletUnlocked: propTypes.bool,
};

const mapStateToProps = state => ({
  viewMyCrypto: state.user.viewMyCrypto,
  networkMatch: state.auth.networkMatch,
  walletUnlocked: state.auth.walletUnlocked,
});

export default withRouter(connect(mapStateToProps)(Routes));
