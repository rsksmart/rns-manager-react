import React, { Component } from 'react';
import { ResolveAddressComponent, SearchDomainComponent } from './components';
import { Container, Row, Col } from 'react-bootstrap';

class Home extends Component {
  render () {
    return(
      <div>
        <Container>
          <Row>
            <Col><SearchDomainComponent /></Col>
          </Row>
          <Row>
            <Col><ResolveAddressComponent /></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
