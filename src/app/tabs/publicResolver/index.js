import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AddrContainer, ContentContainer } from './containers';

import reducer from './reducer';
export default reducer;

class PublicResolver extends Component {
  render () {
    return (
      <Container>
        <Row>
          <Col>
            <h2>Manage resolution</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <AddrContainer name='Address' />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <ContentContainer name='Content' />
          </Col>
        </Row>
      </Container>
    )
  }
}

export const PublicResolverTab = PublicResolver;
