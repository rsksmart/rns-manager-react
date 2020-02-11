import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';
import { networkSelector } from '../selectors';

const IndicatorLight = (props) => {
  const {
    networkMatch,
    network,
    strings,
    hasMetamask,
    walletUnlocked,
  } = props;

  let className = 'btn-outline-success';
  let popup = strings.connected_successful;
  let networkString = networkSelector(network);

  if (!hasMetamask) {
    className = 'btn-outline-warning';
    popup = strings.no_wallet;
  } else if (!walletUnlocked) {
    className = 'btn-outline-warning';
    popup = strings.unlock_wallet;
  } else if (!networkMatch) {
    className = 'btn-outline-danger';
    popup = `${strings.connect_to_network} ${networkSelector(network)}`;
    networkString = strings.unknown_network;
  }

  const body = (
    <div className={`indicator btn disabled ${className}`}>
      <OverlayTrigger
        key="bottom"
        placement="bottom"
        overlay={(
          <Tooltip id="tooltip-status">
            {popup}
          </Tooltip>
        )}
      >
        <span>
          {networkString}
        </span>
      </OverlayTrigger>
    </div>
  );

  return hasMetamask ? body : <Link to="/setup">{body}</Link>;
};

IndicatorLight.propTypes = {
  networkMatch: propTypes.bool.isRequired,
  network: propTypes.string.isRequired,
  hasMetamask: propTypes.bool.isRequired,
  walletUnlocked: propTypes.bool.isRequired,
  strings: propTypes.shape().isRequired,
};

export default multilanguage(IndicatorLight);
