import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ConnectedRouter } from 'connected-react-router';
import Routes from './routes';
import { HeaderContainer } from './containers';
import { AuthModal } from './auth';
import { Notifications } from './notifications';

class App extends Component {
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

export default App;
