import React from 'react';
import propTypes from 'prop-types';
import {
  Row, Col, Form, Button,
} from 'react-bootstrap';
import Switch from 'react-switch';
import { multilanguage } from 'redux-multilanguage';
import { AuthTabWrapper } from '../../../auth';

const UserTabComponent = (props) => {
  const {
    strings, name, address, network, viewMyCrypto, changeMyCryptoMetamask, logOut,
  } = props;

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
            <Switch onChange={changeMyCryptoMetamask} checked={viewMyCrypto} offColor="#888" onColor="#888" checkedIcon={false} uncheckedIcon={false} />
            <span> MyCrypto</span>
          </span>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <Button onClick={logOut}>{strings.log_out}</Button>
        </Col>
      </Row>
    </AuthTabWrapper>
  );
};

UserTabComponent.propTypes = {
  strings: propTypes.shape({
    address: propTypes.string,
    network: propTypes.string,
    active_wallet: propTypes.string,
    log_out: propTypes.string,
  }).isRequired,
  name: propTypes.string.isRequired,
  address: propTypes.string.isRequired,
  network: propTypes.string.isRequired,
  viewMyCrypto: propTypes.bool.isRequired,
  changeMyCryptoMetamask: propTypes.func.isRequired,
  logOut: propTypes.func.isRequired,
};

export default multilanguage(UserTabComponent);
