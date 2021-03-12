import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Alert } from 'react-bootstrap';

const NotEnoughRifComponent = ({ strings }) => (
  <Alert variant="warning" className="notEnoughRif">
    <p>{strings.not_enough_balance}</p>
    <a
      href="https://www.rifos.org/#rif-token"
      target="_blank"
      rel="noopener noreferrer"
    >
      {strings.click_here_not_enough_balance}
    </a>
  </Alert>
);

NotEnoughRifComponent.propTypes = {
  strings: propTypes.shape({
    click_here_not_enough_balance: propTypes.string.isRequired,
    not_enough_balance: propTypes.string.isRequired,
  }).isRequired,
};

export default multilanguage(NotEnoughRifComponent);
