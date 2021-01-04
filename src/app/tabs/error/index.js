import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { multilanguage } from 'redux-multilanguage';
import {
  Button, Container, Row, Col,
} from 'react-bootstrap';

import rskWallet from '../../../assets/rsk_wallet.png';
import { networkSelector } from '../../selectors';
import { start } from '../../auth/operations';

const ErrorTabComponent = ({
  hasWeb3Provider, hasContracts, walletNetwork, envNetwork, walletUnlocked, rLoginConnect, strings,
}) => {
  if (!hasContracts) {
    return (
      <Container className="page">
        <Row style={{ textAlign: 'center', marginTop: '50px' }}>
          <Col>
            <img src={rskWallet} alt="rsk_wallet" width="250px" />
            <h2>{strings.contracts_not_set}</h2>
          </Col>
        </Row>
      </Container>
    );
  }

  if (!hasWeb3Provider) {
    return (
      <Container className="page">
        <Row style={{ textAlign: 'center', marginTop: '50px' }}>
          <Col>
            <img src={rskWallet} alt="rsk_wallet" width="250px" />
            <h2>{strings.no_wallet}</h2>
            <p>{strings.rsk_wallet_needed}</p>
            <Button onClick={() => window.open('https://metamask.io', '_blank')}>
              {strings.get_metamask}
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
  if (!walletUnlocked) {
    return (
      <Container className="page">
        <Row style={{ textAlign: 'center', marginTop: '50px' }}>
          <Col>
            <img src={rskWallet} alt="rsk_wallet" width="250px" />
            <h2>{strings.unlock_connect}</h2>
            <Button onClick={rLoginConnect} size="lg">{strings.connect}</Button>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="page">
      <Row style={{ textAlign: 'center', marginTop: '50px' }}>
        <Col>
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
        </Col>
      </Row>
    </Container>
  );
};

ErrorTabComponent.defaultProps = {
  walletNetwork: '',
};

ErrorTabComponent.propTypes = {
  hasWeb3Provider: propTypes.bool.isRequired,
  hasContracts: propTypes.bool.isRequired,
  walletUnlocked: propTypes.bool.isRequired,
  walletNetwork: propTypes.string,
  envNetwork: propTypes.string.isRequired,
  rLoginConnect: propTypes.func.isRequired,
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

const mapStateToProps = state => ({
  hasWeb3Provider: state.auth.hasWeb3Provider,
  hasContracts: state.auth.hasContracts,
  networkMatch: state.auth.networkMatch,
  walletUnlocked: state.auth.walletUnlocked,
  walletNetwork: networkSelector(state.auth.network),
  envNetwork: networkSelector(process.env.REACT_APP_ENVIRONMENT_ID),
});

const mapDispatchToProps = dispatch => ({
  rLoginConnect: () => dispatch(start()),
});

const ErrorTabConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(multilanguage(ErrorTabComponent));

const ErrorTab = () => (<ErrorTabConnect />);
export default ErrorTab;
