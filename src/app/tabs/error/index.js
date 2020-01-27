import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { multilanguage } from 'redux-multilanguage';
import {
  Button,
} from 'react-bootstrap';

import rskWallet from '../../../assets/rsk_wallet.png';

import { networkSelector } from '../../selectors';


const DetailsSectionComponent = ({
  hasMetamask, walletNetwork, envNetwork, strings,
}) => {
  if (!hasMetamask) {
    return (
      <div>
        <img src={rskWallet} alt="rsk_wallet" width="250px" />
        <h2>No wallet detected</h2>
        <p>{strings.rsk_wallet_needed}</p>
        <Button onClick={() => window.open('https://metamask.io', '_blank')}>{strings.get_metamask}</Button>
      </div>
    );
  }

  return (
    <div>
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
        {strings.current_connected}
        {' '}
        <strong>
          {walletNetwork}
        </strong>
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
  strings: propTypes.arrayOf(propTypes.string).isRequired,
};

const mapStateToProps = state => ({
  hasMetamask: state.auth.hasMetamask,
  networkMatch: state.auth.networkMatch,
  walletNetwork: networkSelector(state.auth.network),
  envNetwork: networkSelector(process.env.REACT_APP_ENVIRONMENT_ID),
});

const DetailsSection = connect(mapStateToProps, null)(multilanguage(DetailsSectionComponent));

const ErrorTab = () => (<DetailsSection />);

export default ErrorTab;
