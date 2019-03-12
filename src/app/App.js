import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router'
import { Header } from './components';
import routes from './routes';
import { Container, Row, Col } from 'react-bootstrap';
import { GetDomainStateContainer } from './containers';

class App extends Component {
  render() {
    const { history } = this.props;
    return (
      <ConnectedRouter history={history}>
        <React.Fragment>
          <header>
            <Header />
          </header>
          <Container>
            <Row>
              <Col>
                <GetDomainStateContainer />
              </Col>
            </Row>
            <Row>
              <Col>
                {routes}
              </Col>
            </Row>
          </Container>
        </React.Fragment>
      </ConnectedRouter>
    );
  }
}

export default App;
