import React from 'react';
import propTypes from 'prop-types';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
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

const Routes = ({ networkMatch = false, walletUnlocked = false, hasContracts }) => {
  const notLoggedIn = !window.rLogin || !networkMatch || !walletUnlocked;

  if (!hasContracts) {
    return <ErrorTab />;
  }

  return (
    <RouterRoutes>
      <Route path="/" element={<HomeTab />} />
      {/* the following path is only for GitHub pages */}
      <Route path="/rns-manager-react" element={<HomeTab />} />
      <Route path="/search" element={<SearchTab />} />
      <Route path="/resolve" element={<ResolveTab />} />
      <Route path="/faq" element={<FaqTab />} />
      <Route path="/registrar" element={<RegistrarTab />} />
      {notLoggedIn ? (
        <Route path="*" element={<ErrorTab />} />
      ) : (
        <>
          <Route path="/newAdmin/*" element={<NewAdminTab />} />
          <Route path="/notifications" element={<NotificationTab />} />
          <Route path="*" element={<ErrorTab notFound />} />
        </>
      )}
    </RouterRoutes>
  );
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

export default connect(mapStateToProps)(Routes);
