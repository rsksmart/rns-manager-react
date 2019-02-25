import React, { Component } from 'react';
import { Header, ResolverAddressComponent, DomainStateComponent } from './components';
import { Container, Row, Col } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Container>
          <Row>
            <Col><DomainStateComponent /></Col>
          </Row>
          <Row>
            <Col><ResolverAddressComponent /></Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
