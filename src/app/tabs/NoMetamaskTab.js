import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import rskWallet from '../../assets/rsk_wallet.png';
import { changeMyCryptoMetamask } from './user/operations';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { multilanguage } from 'redux-multilanguage';

const setMyCryptoButton = props => (
  <Button onClick={() => props.setMyCrypto(props.viewMyCrypto)}>{props.children}</Button>
);

const mapDispatchToProps = dispatch => ({
  setMyCrypto: viewMyCrypto => {
    dispatch(changeMyCryptoMetamask(viewMyCrypto));
    dispatch(push('/search'));
  }
});

const SetMyCryptoButton = connect(null, mapDispatchToProps)(setMyCryptoButton);

export const NoMetamaskTab = multilanguage(props => {
  const { strings } = props;

  return (
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
              <p>{strings.rsk_wallet_needed}</p>
              <Button onClick={() => window.open('https://metamask.io', '_blank')}>{strings.get_metamask}</Button>
              <span> or </span>
              <SetMyCryptoButton viewMyCrypto={true}>{strings.use_with_mycrypto}</SetMyCryptoButton>
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
  );
});
