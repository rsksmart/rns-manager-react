import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router'
import { Header } from './components';
import routes from './routes';
import { Container, Row, Col } from 'react-bootstrap';
import { ErrorStackContainer, TxStackContainer } from './containers';
import { AuthModal } from './auth';

class App extends Component {
  render() {
    const { history } = this.props;
    return (
      <ConnectedRouter history={history}>
        <React.Fragment>
          <Header />
          <div style={{marginTop: '20px'}}>
            <Container>
              {routes}
            </Container>
          </div>
          <Container>
            <Row>
              <Col>
                <ErrorStackContainer />
                <TxStackContainer />
              </Col>
            </Row>
          </Container>
          <AuthModal />
        </React.Fragment>
      </ConnectedRouter>
    );
  }
}

export default App;
