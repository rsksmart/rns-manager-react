import React from 'react';
import propTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const MetamaskButtonComponent = (props) => {
  const {
    startAndClick, enabled, onClick,
  } = props;

  return (
    <Button
      {...props}
      onClick={
      enabled ? onClick : startAndClick
    }
    />
  );
};

MetamaskButtonComponent.propTypes = {
  startAndClick: propTypes.func.isRequired,
  enabled: propTypes.bool.isRequired,
  onClick: propTypes.func.isRequired,
};

export default MetamaskButtonComponent;
