import React, { Component } from 'react';
import { SearchDomainComponent } from './components';
import {  ResolveAddressContainer } from './containers';
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
            <Col><ResolveAddressContainer /></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
