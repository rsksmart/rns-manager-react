import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { StartButton } from '../auth';
import { multilanguage } from 'redux-multilanguage';

export const SetUpTab = multilanguage(props => {
  const { strings } = props;

  return (
    <Container>
      <Row>
        <Col style={{ textAlign: 'left' }}>
          <h2>{strings.setup_title}</h2>
          <ol>
            <li>{strings.setup_download_metamask}</li>
            <li>
              {strings.setup_connect_to_rsk}
              <ol>
                <li>{strings.setup_open_network_selector}</li>
                <li>{strings.setup_select_custom_rpc}</li>
                <li>
                  {strings.setup_select_advanced}
                  <ul>
                    <li>New RPC URL: https://public-node.rsk.co</li>
                    <li>ChainID: 30</li>
                    <li>Symbol: RBTC</li>
                    <li>Nickname: RSK MainNet</li>
                  </ul>
                </li>
                <li>{strings.setup_save}</li>
              </ol>
            </li>
            <li>
              {strings.setup_add_rif}
              <ol>
                <li>{strings.setup_open_left_menu}</li>
                <li>{strings.setup_go_to_add_token}</li>
                <li>{strings.setup_fill_token_address_with_} 0x2acc95758f8b5f583470ba265eb685a8f45fc9d5</li>
                <li>{strings.setup_next}</li>
                <li>{strings.setup_add_tokens}</li>
              </ol>
            </li>
          </ol>
        </Col>
      </Row>
      <Row>
        <Col>
          <StartButton />
        </Col>
      </Row>
    </Container>
  )
});
