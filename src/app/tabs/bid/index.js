import React, { Component } from 'react';
import { GetDomainStateContainer } from '../../containers';
import { Container, Row, Col } from 'react-bootstrap';
import { BidContainer } from './containers';

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
            <BidContainer />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Bid;
