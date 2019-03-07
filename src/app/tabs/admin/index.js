import React, { Component } from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import {
  DomainContainer,
  OwnerContainer,
  ResolverContainer,
  TtlContainer,
  SubdomainsListContainer,
  LinkToResolverContainer
} from './containers';

class Admin extends Component {
  render () {
    return(
      <Container>
        <h2>Admin your domain</h2>
        <Row>
          <Col>
            <DomainContainer />
          </Col>
        </Row>
        <Row>
          <Col>
            <OwnerContainer name='Owner' />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <ResolverContainer name='Resolver' />
          </Col>
        </Row>
        <Row>
          <Col>
            <LinkToResolverContainer />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <TtlContainer name='TTL' />
          </Col>
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
