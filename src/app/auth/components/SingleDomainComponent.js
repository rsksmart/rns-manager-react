import React from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const SingleDomainComponent = ({
  strings, domain, handleTextClick, handleDisconnectClick, isCurrent,
}) => (
  <li className={isCurrent ? 'row current' : 'row'}>
    <div className="col-sm-10 domain">
      <button type="button" onClick={() => handleTextClick(domain)}>
        {domain}
      </button>
    </div>
    <div className="col-sm-2 options">
      <OverlayTrigger
        key="bottom"
        placement="bottom"
        overlay={(
          <Tooltip id="tooltip-status">{strings.disconnect_domain}</Tooltip>
        )}
      >
        <button type="button" onClick={() => handleDisconnectClick(domain)}>-</button>
      </OverlayTrigger>
    </div>
  </li>
);

SingleDomainComponent.defaultProps = {
  isCurrent: false,
};

SingleDomainComponent.propTypes = {
  domain: propTypes.string.isRequired,
  handleTextClick: propTypes.func.isRequired,
  handleDisconnectClick: propTypes.func.isRequired,
  isCurrent: propTypes.bool,
  strings: propTypes.shape({
    disconnect_domain: propTypes.string.isRequired,
  }).isRequired,
};

export default multilanguage(SingleDomainComponent);
