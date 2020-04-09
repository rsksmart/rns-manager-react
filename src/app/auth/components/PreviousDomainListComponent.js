import React from 'react';
import propTypes from 'prop-types';

const PreviousDomainListComponent = ({ previousDomains, switchLoginClick }) => {
  return (
    <div className="switch">
      {previousDomains.map(addr => (
        <button
          key={addr.domain}
          type="button"
          className="switchButton"
          onClick={() => switchLoginClick(addr.domain)}
        >
          {addr.domain}
        </button>
      ))}
    </div>
  );
};

PreviousDomainListComponent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  previousDomains: propTypes.array.isRequired,
  switchLoginClick: propTypes.func.isRequired,
};

export default PreviousDomainListComponent;
