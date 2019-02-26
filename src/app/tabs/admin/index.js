import React, { Component } from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import {
  DomainContainer,
  DomainOwnerContainer,
  DomainResolverContainer,
  DomainTTLContainer,
  SubdomainsListContainer
} from './containers';

class Admin extends Component {
  render () {

    return(
      <Container>
        <h2>Admin your domain</h2>
        <Row>
          <Col><DomainContainer /></Col>
        </Row>
        <DomainOwnerContainer />
        <hr />
        <Row>
          <Col><DomainResolverContainer /></Col>
        </Row>
        <hr />
        <Row>
          <Col><DomainTTLContainer /></Col>
        </Row>
        <hr />
        <Row>
          <SubdomainsListContainer />
        </Row>
      </Container>
    );
  }
}

export default Admin;
