import React, { Component } from 'react';
import { GetDomainStateContainer } from '../../containers';
import { Container, Row, Col } from 'react-bootstrap';

class Bid extends Component {
  render () {
    return(
      <Container>
        <Row>
          <Col>
            <GetDomainStateContainer />
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Bid</h2>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Bid;
