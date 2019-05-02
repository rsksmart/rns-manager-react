import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ConnectedRouter } from 'connected-react-router';
import Routes from './routes';
import { HeaderContainer } from './containers';
import { AuthModal } from './auth';
import { Notifications } from './notifications';
import { loadLanguages } from 'redux-multilanguage'
import { connect } from 'react-redux';

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
    const { history } = this.props;
    return (
      <ConnectedRouter history={history}>
        <React.Fragment>
          <HeaderContainer />
          <Container style={{ marginTop: '20px' }}>
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

export default connect()(App);
