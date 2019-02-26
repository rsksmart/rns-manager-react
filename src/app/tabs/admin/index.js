import React, { Component } from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import {
  DomainContainer,
  DomainOwnerContainer,
  DomainResolverContainer,
  DomainTTLContainer
} from './containers';

class Admin extends Component {
  render () {
    return(
      <Container>
        <h2>Admin your domain</h2>
        <Row>
          <Col><DomainContainer /></Col>
        </Row>
        <Row>
          <Col><DomainOwnerContainer /></Col>
        </Row>
        <Row>
          <Col><DomainResolverContainer /></Col>
        </Row>
        <Row>
          <Col><DomainTTLContainer /></Col>
        </Row>
      </Container>
    );
  }
}

export default Admin;
