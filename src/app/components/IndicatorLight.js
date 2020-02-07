import React from 'react';
import propTypes from 'prop-types';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';
import { networkSelector } from '../selectors';

const IndicatorLight = (props) => {
  const {
    networkMatch,
    network,
    strings,
    hasMetamask,
  } = props;

  let className = 'btn-outline-success';
  let popup = strings.connected_successful;
  let networkString = networkSelector(network);

  if (!hasMetamask) {
    className = 'btn-outline-warning';
    popup = strings.no_wallet;
  } else if (!networkMatch) {
    className = 'btn-outline-danger';
    popup = `${strings.connect_to_network} ${networkSelector(network)}`;
    networkString = strings.unknown_network;
  }

  return (
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
};

IndicatorLight.propTypes = {
  networkMatch: propTypes.bool.isRequired,
  network: propTypes.string.isRequired,
  hasMetamask: propTypes.string.isRequired,
  strings: propTypes.shape().isRequired,
};

export default multilanguage(IndicatorLight);
