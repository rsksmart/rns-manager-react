import React from 'react';
import propTypes from 'prop-types';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';
import { networkSelector } from '../selectors';

const IndicatorLight = (props) => {
  const { networkMatch, network, strings } = props;
  const className = (networkMatch) ? 'btn-outline-success' : 'btn-outline-danger';
  const popup = (networkMatch) ? strings.connected_successful : `${strings.connect_to_network} ${networkSelector(network)}`;

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
          {(networkMatch) ? networkSelector(network) : strings.unknown_network}
        </span>
      </OverlayTrigger>
    </div>
  );
};

IndicatorLight.propTypes = {
  networkMatch: propTypes.bool.isRequired,
  network: propTypes.string.isRequired,
  strings: propTypes.shape().isRequired,
};

export default multilanguage(IndicatorLight);
