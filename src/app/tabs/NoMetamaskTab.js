import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import rskWallet from '../../assets/rsk_wallet.png';

export const NoMetamaskTab = () => (
  <Row style={{ textAlign: 'center' }}>
    <Col>
      <Container>
        <Row>
          <Col>
            <Image src={rskWallet} alt='rsk_wallet' fluid style={{ height: 300 }} />
          </Col>
        </Row>
        <Row center>
          <Col>
            <p>you need an RSK wallet to resolve, register and admin domains</p>
            <hr />
            <p><Button onClick={() => window.open('https://metamask.io', '_blank')}>get metamask</Button></p>
            <p>and connect it to RSK network</p>
            <p><Button onClick={() => window.open('/setup', '_blank')}>connect</Button></p>
            <hr />
            <p><Button onClick={() => window.location.reload()}>done!</Button></p>
          </Col>
        </Row>
      </Container>
    </Col>
  </Row>
);
