import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import rskWallet from '../../../assets/rsk_wallet.png';

import { networkSelector } from '../../selectors';

const DetailsSectionComponent = ({
  hasMetamask, walletNetwork, envNetwork,
}) => {
  if (!hasMetamask) {
    return (
      <div>
        <img src={rskWallet} alt="rsk_wallet" width="250px" />
        <h2>No metamask detected</h2>
      </div>
    );
  }

  return (
    <div>
      <img src={rskWallet} alt="rsk_wallet" width="250px" />
      <h2>Network Mismatch</h2>
      <p>
        Your wallet is connected to
        <strong>
          {' '}
          {walletNetwork}
        </strong>
        .
        <br />
        Your wallet should be connected to
        <strong>
          {' '}
          {envNetwork}
        </strong>
        .
      </p>
    </div>
  );
};

DetailsSectionComponent.defaultProps = {
  walletNetwork: '',
};

DetailsSectionComponent.propTypes = {
  hasMetamask: propTypes.bool.isRequired,
  walletNetwork: propTypes.string,
  envNetwork: propTypes.string.isRequired,
};

const mapStateToProps = state => ({
  hasMetamask: state.auth.hasMetamask,
  networkMatch: state.auth.networkMatch,
  walletNetwork: networkSelector(state.auth.network),
  envNetwork: networkSelector(process.env.REACT_APP_ENVIRONMENT_ID),
});

const DetailsSection = connect(mapStateToProps, null)(DetailsSectionComponent);

const ErrorTab = () => (<DetailsSection />);

export default ErrorTab;
