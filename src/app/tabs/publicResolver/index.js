import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

class PublicResolver extends Component {
  render () {
    return (
      <Container>
        <Row>
          <Col>
            <h2>Manage resolution</h2>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default PublicResolver;
