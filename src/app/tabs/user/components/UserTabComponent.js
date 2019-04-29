import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { AuthTabWrapper } from '../../../auth';
import Switch from 'react-switch';

class UserTabComponent extends Component {
  render () {
    const { name, address, network, viewMyCrypto, changeMyCryptoMetamask } = this.props;

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
        <br />
        <Row>
          <Col>
            <p>execute transacitons in:</p>
            <span>
              <span>Metamask </span>
              <Switch onChange={changeMyCryptoMetamask} checked={viewMyCrypto} offColor={'#888'} onColor={'#888'} checkedIcon={false} uncheckedIcon={false} />
              <span> MyCrypto</span>
            </span>
          </Col>
        </Row>
      </AuthTabWrapper>
    )
  }
}

export default UserTabComponent;
