import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Row, Col } from 'react-bootstrap';
import { SetControllerContainer } from '../containers';


const DomainInfoComponent = ({
  strings, isRegistryOwner, advancedView,
}) => {
  if (isRegistryOwner && advancedView) {
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
              success_title: strings.success,
              success_message: strings.set_controller_success,
              edit_placeholder: strings.controller_placeholder,
            }}
          />
        </Col>
      </Row>
    );
  }

  return <></>;
};

DomainInfoComponent.propTypes = {
  strings: propTypes.shape({
    set_controller: propTypes.string.isRequired,
    set_controller_explanation: propTypes.string.isRequired,
    controller: propTypes.string.isRequired,
    cancel: propTypes.string.isRequired,
    submit: propTypes.string.isRequired,
    reclaim_domain: propTypes.string.isRequired,
    reclaim_domain_explanation: propTypes.string.isRequired,
    set_controller_success: propTypes.string.isRequired,
    success: propTypes.string.isRequired,
    controller_placeholder: propTypes.string.isRequired,
  }).isRequired,
  isRegistryOwner: propTypes.bool.isRequired,
  advancedView: propTypes.bool.isRequired,
};

export default multilanguage(DomainInfoComponent);
