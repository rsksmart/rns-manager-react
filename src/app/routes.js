import React from 'react';
import propTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router';
import { connect } from 'react-redux';
import {
  HomeTab,
  SetUpTab,
  ResolveTab,
  SearchTab,
  RegistrarTab,
  AdminTab,
  PublicResolverTab,
  MultiChainResolverTab,
  NotificationTab,
  ErrorTab,
  NewAdminTab,
  FaqTab,
} from './tabs';

const NoMatch = () => <p>404! Page not found :(</p>;

const Routes = (props) => {
  const { networkMatch, walletUnlocked, hasContracts } = props;

  const notLoggedIn = !window.rLogin || !networkMatch || !walletUnlocked;

  return (
    <Switch>
      {
        !hasContracts && <Route component={ErrorTab} />
      }
      <Route exact path="/" component={HomeTab} />
      <Route path="/setup" component={SetUpTab} />
      <Route path="/search" component={SearchTab} />
      <Route path="/resolve" component={ResolveTab} />
      <Route path="/faq" component={FaqTab} />
      <Route path="/registrar" component={RegistrarTab} />
      {
        notLoggedIn && <Route component={ErrorTab} />
      }
      <Route path="/admin" component={AdminTab} />
      <Route path="/newAdmin" component={NewAdminTab} />
      <Route path="/publicResolver" component={PublicResolverTab} />
      <Route path="/notifications" component={NotificationTab} />
      <Route component={NoMatch} />
    </Switch>
  );
};

Routes.defaultProps = {
  networkMatch: false,
  walletUnlocked: false,
};

Routes.propTypes = {
  networkMatch: propTypes.bool,
  walletUnlocked: propTypes.bool,
  hasContracts: propTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  networkMatch: state.auth.networkMatch,
  walletUnlocked: state.auth.walletUnlocked,
  hasContracts: state.auth.hasContracts,
});

export default withRouter(connect(mapStateToProps)(Routes));
