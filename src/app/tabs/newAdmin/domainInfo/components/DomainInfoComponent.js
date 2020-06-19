import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Row, Col } from 'react-bootstrap';

import CopyButtonComponent from '../../../../components/CopyButtonComponent';
import UserWaitingComponent from '../../../../components/UserWaitingComponent';
import { ReclaimContainer } from '../../containers';
import ShareButtonComponent from './ShareButtonComponent';

import {
  TransferAddressContainer, RenewButtonContainer, RenewDomainContainer,
  TransferSuccessModalContainer, UpgradeContainer,
  SetControllerViewContainer,
} from '../containers';

const DomainInfoComponent = (props) => {
  const {
    strings,
    domain,
    isSubdomain,
    isTransferSuccess,
    isTokenOwner,
    checkingRegistryOwner,
    checkingOwnership,
    isRegistryOwner,
    isFifsMigrated,
  } = props;

  if (isTransferSuccess) {
    return (
      <TransferSuccessModalContainer />
    );
  }

  if (checkingRegistryOwner || checkingOwnership) {
    return <UserWaitingComponent visible />;
  }

  return (
    <div className="domainInfo">
      <h1>{strings.domain_info}</h1>
      <Row>
        <Col md={7}>
          <div className="domain">
            {domain}
            <CopyButtonComponent text={domain} />
            <ShareButtonComponent domain={domain} />
          </div>
        </Col>
        {!isSubdomain && (
          <Col md={5} className="renew">
            <RenewButtonContainer />
          </Col>
        )}
      </Row>
      <RenewDomainContainer />
      {(isTokenOwner && !isSubdomain && isFifsMigrated)
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
              edit_placeholder: strings.address_placeholder,
            }}
          />
        </Col>
      </Row>
      )}
      <UpgradeContainer />
      {(isTokenOwner && !isSubdomain) && <SetControllerViewContainer />}
      {(!isRegistryOwner && !isSubdomain) && <ReclaimContainer isDomainInfo />}
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
    address_placeholder: propTypes.string.isRequired,
  }).isRequired,
  domain: propTypes.string.isRequired,
  isSubdomain: propTypes.bool.isRequired,
  isTokenOwner: propTypes.bool,
  isTransferSuccess: propTypes.bool.isRequired,
  checkingRegistryOwner: propTypes.bool.isRequired,
  checkingOwnership: propTypes.bool.isRequired,
  isRegistryOwner: propTypes.bool.isRequired,
  isFifsMigrated: propTypes.bool.isRequired,
};

export default multilanguage(DomainInfoComponent);
