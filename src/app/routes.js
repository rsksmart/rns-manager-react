import React from 'react';
import propTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router';
import { connect } from 'react-redux';
import {
  HomeTab,
  ResolveTab,
  SearchTab,
  RegistrarTab,
  NotificationTab,
  ErrorTab,
  NewAdminTab,
  FaqTab,
} from './tabs';

const Routes = (props) => {
  const { networkMatch, walletUnlocked, hasContracts } = props;

  const notLoggedIn = !window.rLogin || !networkMatch || !walletUnlocked;

  return (
    <Switch>
      {
        !hasContracts && <Route component={ErrorTab} />
      }
      <Route exact path="/:id" component={HomeTab} />
      {/* the following path is only for GitHub pages */}
      <Route exact path="/rns-manager-react" component={HomeTab} />
      <Route path="/search" component={SearchTab} />
      <Route path="/resolve" component={ResolveTab} />
      <Route path="/faq" component={FaqTab} />
      <Route path="/registrar" component={RegistrarTab} />
      {
        notLoggedIn && <Route component={ErrorTab} />
      }
      <Route path="/newAdmin" component={NewAdminTab} />
      <Route path="/notifications" component={NotificationTab} />
      <Route component={() => <ErrorTab notFound />} />
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
