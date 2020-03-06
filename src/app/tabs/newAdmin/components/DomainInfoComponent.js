import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Row, Col } from 'react-bootstrap';

import CopyButtonComponent from '../../../components/CopyButtonComponent';
import AddressInputContainer from '../../../containers/AddressInputContainer';

const DomainInfoComponent = (props) => {
  const {
    strings,
    domain,
  } = props;

  return (
    <div className="domainInfo">
      <h1>{strings.domain_info}</h1>
      <Row>
        <Col md={8}>
          <div className="domain">
            {domain}
            <CopyButtonComponent text={domain} />
          </div>
        </Col>
        <Col md={4} className="renew">
          RENEW
        </Col>
      </Row>
      <Row className="break-above">
        <Col>
          <h2>{strings.transfer}</h2>
          <p>{strings.transfer_warning}</p>
          <AddressInputContainer />
        </Col>
      </Row>
    </div>
  );
};

DomainInfoComponent.propTypes = {
  strings: propTypes.shape({
    domain_info: propTypes.string.isRequired,
    transfer: propTypes.string.isRequired,
    transfer_warning: propTypes.string.isRequired,
  }).isRequired,
  domain: propTypes.string.isRequired,
};

export default multilanguage(DomainInfoComponent);
