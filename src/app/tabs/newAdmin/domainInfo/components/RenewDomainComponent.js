import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Row, Col, Button } from 'react-bootstrap';

import { RentalPeriodContainer } from '../../../registrar/containers';

const RenewDomainComponent = (props) => {
  const { isRenewOpen, isRenewing, handleRenewClick, strings } = props;
  if (!isRenewOpen) {
    return (<></>);
  }

  return (
    <Row className="renewDomian">
      <Col md={6}>
        <RentalPeriodContainer />
      </Col>
      <Col md={6}>
        <Button
          onClick={handleRenewClick}
          className="renew"
          disabled={isRenewing}
        >
          {strings.renew_domain}
        </Button>
        <p className="explanation break-above">{strings.renew_explanation}</p>
      </Col>
    </Row>
  );
};

RenewDomainComponent.propTypes = {
  strings: propTypes.shape({
    renew_domain: propTypes.string.isRequired,
    renew_explanation: propTypes.string.isRequired,
  }).isRequired,
  isRenewOpen: propTypes.bool.isRequired,
  isRenewing: propTypes.bool.isRequired,
  handleRenewClick: propTypes.func.isRequired,
};

export default multilanguage(RenewDomainComponent);
