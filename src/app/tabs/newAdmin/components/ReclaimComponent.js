import React from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';

import { UserWaitingComponent, UserErrorComponent } from '../../../components';

const ReclaimComponent = ({
  strings, reclaimDomain, isError, errorMessage, handleCloseClick, isSettingRegistryOwner,
  isDomainInfo, domain, registryOwner,
}) => (
  <div className="reclaim major-section">

    {(isDomainInfo && !isSettingRegistryOwner) && (
    <>
      <h2>{strings.set_controller}</h2>
      <p>{strings.set_controller_explanation}</p>
      <Row className="addressInput">
        <div className="view row">
          <Col md={3} className="label">
            {domain}
          </Col>
          <Col md={9} className="value">
            <span className="value-prefix">
              {`${strings.controller}: `}
            </span>
            {registryOwner}
          </Col>
        </div>
      </Row>
      <br />
    </>
    )}
    <Row>
      <Col>
        <h2>{isDomainInfo ? strings.missing_features : strings.please_reclaim_domain}</h2>
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

ReclaimComponent.defaultProps = {
  isDomainInfo: false,
};

ReclaimComponent.propTypes = {
  strings: propTypes.shape({
    set_controller: propTypes.string.isRequired,
    set_controller_explanation: propTypes.string.isRequired,
    controller: propTypes.string.isRequired,
    cancel: propTypes.string.isRequired,
    submit: propTypes.string.isRequired,
    missing_features: propTypes.string.isRequired,
    please_reclaim_domain: propTypes.string.isRequired,
    reclaim_domain: propTypes.string.isRequired,
    reclaim_domain_explanation: propTypes.string.isRequired,
  }).isRequired,
  reclaimDomain: propTypes.func.isRequired,
  isError: propTypes.bool.isRequired,
  errorMessage: propTypes.string.isRequired,
  handleCloseClick: propTypes.func.isRequired,
  isSettingRegistryOwner: propTypes.bool.isRequired,
  isDomainInfo: propTypes.bool,
  domain: propTypes.string.isRequired,
  registryOwner: propTypes.string.isRequired,
};

export default multilanguage(ReclaimComponent);
