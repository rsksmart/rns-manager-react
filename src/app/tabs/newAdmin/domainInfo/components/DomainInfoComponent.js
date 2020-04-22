import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Row, Col } from 'react-bootstrap';

import CopyButtonComponent from '../../../../components/CopyButtonComponent';
import {
  TransferAddressContainer, RenewButtonContainer, RenewDomainContainer,
  TransferSuccessModalContainer, UpgradeContainer, SetControllerContainer,
} from '../containers';

const DomainInfoComponent = (props) => {
  const {
    strings,
    domain,
    isSubdomain,
    isTransferSuccess,
    isTokenOwner,
    advancedView,
    checkingRegistryOwner,
  } = props;

  if (isTransferSuccess) {
    return (
      <TransferSuccessModalContainer />
    );
  }

  return (
    <div className="domainInfo">
      <h1>{strings.domain_info}</h1>
      <Row>
        <Col md={7}>
          <div className="domain">
            {domain}
            <CopyButtonComponent text={domain} />
          </div>
        </Col>
        {!isSubdomain && (
          <Col md={5} className="renew">
            <RenewButtonContainer />
          </Col>
        )}
      </Row>
      <RenewDomainContainer />
      {(!isSubdomain && isTokenOwner)
      && (
      <Row className="break-above">
        <Col>
          <h2>{strings.transfer}</h2>
          <p>{strings.transfer_warning}</p>
          <TransferAddressContainer
            strings={{
              value_prefix: strings.owner,
              submit: strings.transfer,
              cancel: strings.cancel,
              error_title: 'Error!',
            }}
          />
        </Col>
      </Row>
      )}
      <UpgradeContainer />
      {(advancedView && !checkingRegistryOwner) && (
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
      )}
    </div>
  );
};

DomainInfoComponent.defaultProps = {
  isTokenOwner: false,
};

DomainInfoComponent.propTypes = {
  strings: propTypes.shape({
    cancel: propTypes.string.isRequired,
    domain_info: propTypes.string.isRequired,
    owner: propTypes.string.isRequired,
    transfer: propTypes.string.isRequired,
    transfer_warning: propTypes.string.isRequired,
    set_controller: propTypes.string.isRequired,
    set_controller_explanation: propTypes.string.isRequired,
    controller: propTypes.string.isRequired,
    submit: propTypes.string.isRequired,
  }).isRequired,
  domain: propTypes.string.isRequired,
  isSubdomain: propTypes.bool.isRequired,
  isTokenOwner: propTypes.bool,
  isTransferSuccess: propTypes.bool.isRequired,
  advancedView: propTypes.bool.isRequired,
  checkingRegistryOwner: propTypes.bool.isRequired,
};

export default multilanguage(DomainInfoComponent);
