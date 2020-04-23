import React from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';

import { UserWaitingComponent, UserErrorComponent } from '../../../components';

const ReclaimComponent = ({
  strings, reclaimDomain, isError, errorMessage, handleCloseClick, isSettingRegistryOwner,
}) => (
  <div className="major-section">
    <Row>
      <Col>
        <h2>{strings.reclaim_domain}</h2>
      </Col>
    </Row>
    <Row>
      <Col md={9}>
        <p>{strings.reclaim_domain_explanation}</p>
      </Col>
      <Col md={3}>
        <p>
          <Button
            disabled={isSettingRegistryOwner}
            onClick={() => reclaimDomain()}
          >
            Reclaim Domain
          </Button>
        </p>
      </Col>
    </Row>
    <UserErrorComponent
      visible={isError}
      message={errorMessage}
      handleCloseClick={handleCloseClick}
    />
    <UserWaitingComponent visible={isSettingRegistryOwner} />
  </div>
);

ReclaimComponent.propTypes = {
  strings: propTypes.shape({
    set_controller: propTypes.string.isRequired,
    set_controller_explanation: propTypes.string.isRequired,
    controller: propTypes.string.isRequired,
    cancel: propTypes.string.isRequired,
    submit: propTypes.string.isRequired,
    reclaim_domain: propTypes.string.isRequired,
    reclaim_domain_explanation: propTypes.string.isRequired,
  }).isRequired,
  reclaimDomain: propTypes.func.isRequired,
  isError: propTypes.bool.isRequired,
  errorMessage: propTypes.string.isRequired,
  handleCloseClick: propTypes.func.isRequired,
  isSettingRegistryOwner: propTypes.bool.isRequired,
};

export default multilanguage(ReclaimComponent);
