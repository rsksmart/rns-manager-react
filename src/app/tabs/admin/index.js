import React, { Component } from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import { DomainContainer, DomainOwnerContainer } from './containers';

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
      </Container>
    );
  }
}

export default Admin;
