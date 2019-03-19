import React, { Component } from 'react';
import { GetDomainStateContainer } from '../containers';
import { Container, Row, Col } from 'react-bootstrap';

class TabWithSearchComponent extends Component {
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
            {this.props.children}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TabWithSearchComponent;
