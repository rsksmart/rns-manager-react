import React from 'react';
import propTypes from 'prop-types';
import { Form } from 'react-bootstrap';

const MetamaskButtonComponent = (props) => {
  const {
    startAndSubmit, enabled, onSubmit, children,
  } = props;

  return (
    <Form
      {...props}
      onSubmit={
      enabled
        ? (e) => {
          e.preventDefault();
          onSubmit();
        }
        : (e) => {
          e.preventDefault();
          startAndSubmit();
        }
    }
    >
      {children}
    </Form>
  );
};

MetamaskButtonComponent.propTypes = {
  startAndSubmit: propTypes.func.isRequired,
  enabled: propTypes.bool.isRequired,
  onSubmit: propTypes.func.isRequired,
  children: propTypes.node.isRequired,
};

export default MetamaskButtonComponent;
