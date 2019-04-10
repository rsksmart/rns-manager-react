import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export const SetUpTab = () => (
  <Container>
    <Row>
      <Col>
        <h2>Set up</h2>
        <ol>
          <li>Download MetaMask</li>
          <li>
            Connect Metamask to RSK network:
            <ol>
              <li>Open network selector</li>
              <li>Select 'Custom RPC'</li>
              <li>
                In new RPC url select 'Advanced options' and fill:
                <ul>
                  <li>New RPC URL: https://public-node.rsk.co</li>
                  <li>ChainID: 30</li>
                  <li>Symbol: RBTC</li>
                  <li>Nickname: RSK MainNet</li>
                </ul>
              </li>
              <li>Save</li>
            </ol>
          </li>
          <li>
            Add RIF Token view (optional):
            <ol>
              <li>Open left menu</li>
              <li>Go to 'Add token'</li>
              <li>In custom token tab fill Token address with: 0x2acc95758f8b5f583470ba265eb685a8f45fc9d5</li>
              <li>Next</li>
              <li>Add tokens</li>
            </ol>
          </li>
        </ol>
      </Col>
    </Row>
  </Container>
);
