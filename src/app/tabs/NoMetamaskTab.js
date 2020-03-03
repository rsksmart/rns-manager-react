import React from 'react';
import propTypes from 'prop-types';
import {
  Container, Row, Col, Image, Button,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { multilanguage } from 'redux-multilanguage';
import rskWallet from '../../assets/rsk_wallet.png';

const setMyCryptoButton = ({ setMyCrypto, viewMyCrypto, children }) => (
  <Button onClick={() => setMyCrypto(viewMyCrypto)}>{children}</Button>
);

setMyCryptoButton.propTypes = {
  setMyCrypto: propTypes.func.isRequired,
  viewMyCrypto: propTypes.func.isRequired,
  children: propTypes.node.isRequired,
};

const mapDispatchToProps = () => ({});

const SetMyCryptoButton = connect(null, mapDispatchToProps)(setMyCryptoButton);

const NoMetamaskTab = multilanguage(({ strings }) => (
  <Row>
    <Col>
      <Container>
        <Row>
          <Col>
            <Image src={rskWallet} alt="rsk_wallet" fluid style={{ height: 300 }} />
          </Col>
        </Row>
        <Row>
          <Col>
            <p>{strings.rsk_wallet_needed}</p>
            <Button onClick={() => window.open('https://metamask.io', '_blank')}>{strings.get_metamask}</Button>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <p>{strings.connect_metamask_to_rsk}</p>
            <Button onClick={() => window.open('/setup', '_blank')}>{strings.connect}</Button>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <SetMyCryptoButton viewMyCrypto={false}>{strings.done}</SetMyCryptoButton>
          </Col>
        </Row>
      </Container>
    </Col>
  </Row>
));

NoMetamaskTab.propTypes = {
  strings: propTypes.arrayOf(propTypes.string).isRequired,
};

export default NoMetamaskTab;
