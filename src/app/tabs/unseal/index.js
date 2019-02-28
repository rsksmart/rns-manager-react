import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { GetDomainStateContainer } from '../../containers';

class Unseal extends Component {
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
            <h2>Unseal bid</h2>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Unseal;
