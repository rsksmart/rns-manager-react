import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Container, Row, Col, Alert,
} from 'react-bootstrap';
import { ConnectedRouter } from 'connected-react-router';
import { loadLanguages, multilanguage } from 'redux-multilanguage';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Routes from './routes';
import { HeaderContainer } from './containers';
import { AuthModal } from './auth';
import { Notifications, notificationTypes } from './notifications';


import { multiChainResolver } from '../config/contracts';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(loadLanguages({
      languages: {
        // eslint-disable-next-line global-require
        en: require('../languages/en.json'),
      },
    }));
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { strings, history, multiChainNotification } = this.props;

    return (
      <ConnectedRouter history={history}>
        <React.Fragment>
          <HeaderContainer />
          <Container style={{ marginTop: '20px' }}>
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
            <Row>
              <Col>
                <Container style={{ textAlign: 'center' }}>
                  <Row>
                    <Col>
                      {<Routes />}
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
            <Row>
              <Col>
                <Notifications />
              </Col>
            </Row>
            <AuthModal />
          </Container>
        </React.Fragment>
      </ConnectedRouter>
    );
  }
}

App.propTypes = {
  dispatch: propTypes.func.isRequired,
  strings: propTypes.shape({
    migrate_multichain_resolver_title: propTypes.string.isRequired,
    migrate_multichain_resolver_message: propTypes.string.isRequired,
  }).isRequired,
  multiChainNotification: propTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  multiChainNotification: state.notifications.find(n => n.type === notificationTypes.MIGRATE_RESOLVER) && !localStorage.getItem('multichain_resolver_dissimised'),
});

export default connect(mapStateToProps)(multilanguage(App));
