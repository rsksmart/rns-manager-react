import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import rskWallet from '../../assets/rsk_wallet.png';

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
