import React, { Component } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { ConnectedRouter } from 'connected-react-router';
import Routes from './routes';
import { HeaderContainer } from './containers';
import { AuthModal } from './auth';
import { Notifications } from './notifications';
import { loadLanguages } from 'redux-multilanguage'
import { connect } from 'react-redux';
import { notificationTypes } from './notifications';
import { multilanguage } from 'redux-multilanguage';
import { Link } from 'react-router-dom';
import config from '../config/contracts';

class App extends Component {
  componentDidMount () {
    const { dispatch } = this.props;

    dispatch(loadLanguages({
      languages: {
        en: require('../languages/en.json')
      }
    }));
  }

  render() {
    const { strings, history, multiChainNotification } = this.props;
    const { multiChainResolver } = config('app/tabs/index');

    return (
      <ConnectedRouter history={history}>
        <React.Fragment>
          <HeaderContainer />
          <Container style={{ marginTop: '20px' }}>
            {
              multiChainNotification &&
              <Alert variant='info' dismissible onClose={() => localStorage.setItem('multichain_resolver_dissimised', 1)}>
                <Alert.Heading>{strings.migrate_multichain_resolver_title}</Alert.Heading>
                {strings.migrate_multichain_resolver_message}
                <hr />
                <Link to={`/admin?action=resolver&defaultValue=${multiChainResolver}`} className='btn btn-primary'>migrate</Link>
              </Alert>
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

const mapStateToProps = state => ({
  multiChainNotification: state.notifications.find(n => n.type === notificationTypes.MIGRATE_RESOLVER) && !localStorage.getItem('multichain_resolver_dissimised')
});

export default connect(mapStateToProps)(multilanguage(App));
