import React, { Component } from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import { OwnerContainer, ResolverContainer, TtlContainer, SubdomainsListContainer, LinkToResolverContainer } from './containers';

import reducer from './reducer';
export default reducer;

class AdminTab extends Component {
  render () {
    return(
      <Container>
        <h2>Admin your domain</h2>
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

export { AdminTab };
