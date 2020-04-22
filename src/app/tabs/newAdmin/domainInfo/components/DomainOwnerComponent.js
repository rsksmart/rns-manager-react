import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Row, Col } from 'react-bootstrap';
import { SetControllerContainer } from '../containers';

const DomainInfoComponent = ({
  strings, domainOwner,
}) => {
  if (domainOwner) {
    return (
      <Row className="break-above">
        <Col>
          <h2>{strings.set_controller}</h2>
          <p>{strings.set_controller_explanation}</p>
          <SetControllerContainer
            strings={{
              value_prefix: strings.controller,
              submit: strings.submit,
              cancel: strings.cancel,
              error_title: 'Error!',
            }}
          />
        </Col>
      </Row>
    );
  }

  return (
    <div>You are not the owner!</div>
  );
};

DomainInfoComponent.propTypes = {
  strings: propTypes.shape({
    set_controller: propTypes.string.isRequired,
    set_controller_explanation: propTypes.string.isRequired,
    controller: propTypes.string.isRequired,
    cancel: propTypes.string.isRequired,
    submit: propTypes.string.isRequired,
  }).isRequired,
  domain: propTypes.string.isRequired,
  domainOwner: propTypes.bool.isRequired,
};

export default multilanguage(DomainInfoComponent);
