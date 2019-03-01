import React, { Component } from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import { FinalizeContainer } from './containers';
import { GetDomainStateContainer } from '../../containers';

class Finalize extends Component {
  render () {
    return (
      <Container>
        <Row>
          <Col>
            <GetDomainStateContainer />
          </Col>
        </Row>
        <Row>
          <Col>
            <FinalizeContainer />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Finalize;
