import React from 'react';
import propTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import { multilanguage } from 'redux-multilanguage';
import { connect } from 'react-redux';
import Routes from './routes';
import { HeaderContainer, FooterContainer } from './containers';
import { AuthModal } from './auth';
import { Notifications, notificationTypes } from './notifications';


// eslint-disable-next-line react/prop-types
const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <React.Fragment>
      <HeaderContainer />
      <Routes />
      <Notifications />
      <AuthModal />
      <FooterContainer />
    </React.Fragment>
  </ConnectedRouter>
);

App.propTypes = {
  strings: propTypes.shape({
    migrate_multichain_resolver_title: propTypes.string.isRequired,
    migrate_multichain_resolver_message: propTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  multiChainNotification: state.notifications.find(n => n.type === notificationTypes.MIGRATE_RESOLVER) && !localStorage.getItem('multichain_resolver_dissimised'),
});

export default connect(mapStateToProps)(multilanguage(App));
