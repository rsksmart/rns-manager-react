import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { GetDomainStateContainer } from './containers';

class Bid extends Component {
  render () {
    return (
      <Container>
        <Row>
          <Col>
            <GetDomainStateContainer />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Bid;
