import React from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const AutoLoginComponent = (props) => {
  const { strings, handleClick } = props;

  return (
    <Button onClick={handleClick}>
      {strings.log_in}
    </Button>
  );
};

AutoLoginComponent.propTypes = {
  strings: propTypes.shape({
    log_in: propTypes.string.isRequired,
  }).isRequired,
  handleClick: propTypes.func.isRequired,
};

export default multilanguage(AutoLoginComponent);
