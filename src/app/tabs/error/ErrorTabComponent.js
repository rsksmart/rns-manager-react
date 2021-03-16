import React, { useState } from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import {
  Button, Container, Row, Col,
} from 'react-bootstrap';

import rskWallet from '../../../assets/rsk_wallet.png';


// eslint-disable-next-line react/prop-types
const ContainerWrapper = ({ children }) => (
  <Container className="page">
    <Row style={{ textAlign: 'center', marginTop: '50px' }}>
      <Col>{children}</Col>
    </Row>
  </Container>
);

const ErrorTabComponent = ({
  hasWeb3Provider, hasContracts, walletNetwork, envNetwork,
  walletUnlocked, rLoginConnect, strings, notFound,
}) => {
  if (notFound) {
    return (
      <ContainerWrapper>
        <h2>Error 404</h2>
        <p>Page not found</p>
      </ContainerWrapper>
    );
  }

  if (!hasContracts) {
    return (
      <ContainerWrapper>
        <img src={rskWallet} alt="rsk_wallet" width="250px" />
        <h2>{strings.contracts_not_set}</h2>
      </ContainerWrapper>
    );
  }

  if (!hasWeb3Provider) {
    return (
      <ContainerWrapper>
        <img src={rskWallet} alt="rsk_wallet" width="250px" />
        <h2>{strings.no_wallet}</h2>
        <p>{strings.rsk_wallet_needed}</p>
        <Button onClick={() => window.open('https://metamask.io', '_blank')}>
          {strings.get_metamask}
        </Button>
      </ContainerWrapper>
    );
  }
  if (!walletUnlocked) {
    useState(() => { rLoginConnect(); }, []);
    return (
      <ContainerWrapper>
        <img src={rskWallet} alt="rsk_wallet" width="250px" />
        <h2>{strings.unlock_connect}</h2>
        <Button onClick={rLoginConnect} size="lg">{strings.connect}</Button>
      </ContainerWrapper>
    );
  }

  return (
    <ContainerWrapper>
      <img src={rskWallet} alt="rsk_wallet" width="250px" />
      <h2>{strings.network_mismatch}</h2>
      <p>
        {strings.connect_to_network}
        {' '}
        <strong>
          {envNetwork}
        </strong>
      </p>

      <p>
        {`${strings.current_connected} ${walletNetwork}`}
      </p>
    </ContainerWrapper>
  );
};

ErrorTabComponent.defaultProps = {
  walletNetwork: '',
  notFound: false,
};

ErrorTabComponent.propTypes = {
  hasWeb3Provider: propTypes.bool.isRequired,
  hasContracts: propTypes.bool.isRequired,
  walletUnlocked: propTypes.bool.isRequired,
  walletNetwork: propTypes.string,
  envNetwork: propTypes.string.isRequired,
  rLoginConnect: propTypes.func.isRequired,
  notFound: propTypes.bool,
  strings: propTypes.shape({
    no_wallet: propTypes.string.isRequired,
    rsk_wallet_needed: propTypes.string.isRequired,
    get_metamask: propTypes.string.isRequired,
    unlock_wallet: propTypes.string.isRequired,
    network_mismatch: propTypes.string.isRequired,
    connect_to_network: propTypes.string.isRequired,
    current_connected: propTypes.string.isRequired,
    contracts_not_set: propTypes.string.isRequired,
    connect: propTypes.string.isRequired,
    unlock_connect: propTypes.string.isRequired,
  }).isRequired,
};

export default multilanguage(ErrorTabComponent);
