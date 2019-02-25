import React, { Component } from 'react';
import { ResolverAddressComponent, DomainStateComponent } from './components';
import { Container, Row, Col } from 'react-bootstrap';

class Home extends Component {
  render () {
    return(
      <div>
        <Container>
          <Row>
            <Col><DomainStateComponent /></Col>
          </Row>
          <Row>
            <Col><ResolverAddressComponent /></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
