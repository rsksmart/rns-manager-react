import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { AuthTabWrapper } from '../../../auth';

class UserTabComponent extends Component {
  render () {
    const { name, address, network } = this.props;

    return (
      <AuthTabWrapper>
        <Row>
          <Col>
            <h2>{name}</h2>
          </Col>
        </Row>
        <br />
        <Row>
          <Col md={4}>address</Col>
          <Col md={8}>{address}</Col>
        </Row>
        <br />
        <Row>
          <Col md={4}>network</Col>
          <Col md={8}>{network}</Col>
        </Row>
      </AuthTabWrapper>
    )
  }
}

export default UserTabComponent;
