import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Row, Col, Button } from 'react-bootstrap';
import { SetControllerContainer } from '../containers';
import { UserWaitingComponent, UserErrorComponent } from '../../../../components';

const DomainInfoComponent = ({
  strings, isRegistryOwner, registryOwner, domain, reclaimDomain,
  isError, errorMessage, handleCloseClick, isSettingDomainOwner,
}) => {
  if (isRegistryOwner) {
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
              disabled={isSettingDomainOwner}
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
      <UserWaitingComponent visible={isSettingDomainOwner} />
      <Row>
        <Col md={12}>
          <h2 className="break-above">{strings.controller}</h2>
          <div className="row addressInput">
            <div className="row view">
              <div className="col-md-3 label">
                {domain}
              </div>
              <div className="col-md-8 value">
                <span className="value-prefix">controller: </span>
                {registryOwner}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
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
  }).isRequired,
  domain: propTypes.string.isRequired,
  isRegistryOwner: propTypes.bool.isRequired,
  registryOwner: propTypes.string.isRequired,
  reclaimDomain: propTypes.func.isRequired,
  isError: propTypes.bool.isRequired,
  errorMessage: propTypes.string.isRequired,
  handleCloseClick: propTypes.func.isRequired,
  isSettingDomainOwner: propTypes.bool.isRequired,
};

export default multilanguage(DomainInfoComponent);
