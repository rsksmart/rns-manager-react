import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import rskWallet from '../../assets/rsk_wallet.png';
import { changeMyCryptoMetamask } from './user/operations';
import { connect } from 'react-redux';

const setMyCryptoButton = props => (
  <Button onClick={props.setMyCrypto}>use with mycrypto</Button>
);

const mapDispatchToProps = dispatch => ({
  setMyCrypto: () => dispatch(changeMyCryptoMetamask(true))
});

const SetMyCryptoButton = connect(null, mapDispatchToProps)(setMyCryptoButton);

export const NoMetamaskTab = () => (
  <Row>
    <Col>
      <Container>
        <Row>
          <Col>
            <Image src={rskWallet} alt='rsk_wallet' fluid style={{ height: 300 }} />
          </Col>
        </Row>
        <Row>
          <Col>
            <p>you need an RSK wallet to resolve, register and admin domains</p>
            <Button onClick={() => window.open('https://metamask.io', '_blank')}>get metamask</Button>
            <span> or </span>
            <SetMyCryptoButton />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
          <p>and connect it to RSK network</p>
          <Button onClick={() => window.open('/setup', '_blank')}>connect</Button>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <Button onClick={() => window.location.reload()}>done!</Button>
          </Col>
        </Row>
      </Container>
    </Col>
  </Row>
);
