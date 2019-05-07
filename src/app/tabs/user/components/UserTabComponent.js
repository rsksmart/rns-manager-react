import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { AuthTabWrapper } from '../../../auth';
import Switch from 'react-switch';
import { LanguageSelectContainer } from '../containers';
import { multilanguage } from 'redux-multilanguage';

class UserTabComponent extends Component {
  render () {
    const { strings, name, address, network, viewMyCrypto, changeMyCryptoMetamask, logOut } = this.props;

    return (
      <AuthTabWrapper>
        <Row>
          <Col>
            <h2>{name}</h2>
          </Col>
        </Row>
        <br />
        <Row>
          <Col md={4}>{strings.address}</Col>
          <Col md={8}>{address}</Col>
        </Row>
        <br />
        <Row>
          <Col md={4}>{strings.network}</Col>
          <Col md={8}>{network}</Col>
        </Row>
        <hr />
        <Row>
          <Col md={4}>
            <Form.Label>{strings.active_wallet}</Form.Label>
          </Col>
          <Col md={8}>
            <span>
              <span>Metamask </span>
              <Switch onChange={changeMyCryptoMetamask} checked={viewMyCrypto} offColor={'#888'} onColor={'#888'} checkedIcon={false} uncheckedIcon={false} />
              <span> MyCrypto</span>
            </span>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <LanguageSelectContainer />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={logOut}>{strings.log_out}</Button>
          </Col>
        </Row>
      </AuthTabWrapper>
    )
  }
}

export default multilanguage(UserTabComponent);
