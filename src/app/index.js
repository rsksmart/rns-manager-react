import React from 'react';
import propTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import { ConnectedRouter } from 'connected-react-router';
import { multilanguage } from 'redux-multilanguage';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Routes from './routes';
import { HeaderContainer, FooterContainer } from './containers';
import { AuthModal } from './auth';
import { Notifications, notificationTypes } from './notifications';
import { multiChainResolver } from './adapters/configAdapter';

// eslint-disable-next-line react/prop-types
const App = ({ strings, history, multiChainNotification }) => (
  <ConnectedRouter history={history}>
    <React.Fragment>
      <HeaderContainer />
      {
        multiChainNotification
        && (
        <Alert variant="info" dismissible onClose={() => localStorage.setItem('multichain_resolver_dissimised', 1)}>
          <Alert.Heading>{strings.migrate_multichain_resolver_title}</Alert.Heading>
          {strings.migrate_multichain_resolver_message}
          <hr />
          <Link to={`/admin?action=resolver&defaultValue=${multiChainResolver}`} className="btn btn-primary">migrate</Link>
        </Alert>
        )
      }
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
  multiChainNotification: propTypes.bool,
};

App.defaultProps = {
  multiChainNotification: false,
};

const mapStateToProps = state => ({
  multiChainNotification: state.notifications.find(n => n.type === notificationTypes.MIGRATE_RESOLVER) && !localStorage.getItem('multichain_resolver_dissimised'),
});

export default connect(mapStateToProps)(multilanguage(App));
