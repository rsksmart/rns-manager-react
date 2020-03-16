import React, { useState } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';

import { Row, Col, Button } from 'react-bootstrap';
import { validateAddress } from '../../../../validations';

import {
  UserErrorComponent, UserSuccessComponent, UserWaitingComponent,
} from '../../../../components';
import { ChecksumErrorContainer } from '../../../../containers';

const NewSubdomainComponent = ({
  strings,
  domain,
  handleClick,
  errorMessage,
  handleErrorClose,
  handleSuccessClose,
  confirmedTx,
  newRequesting,
  newWaiting,
}) => {
  const [localError, setLocalError] = useState('');
  const [checksumError, setChecksumError] = useState(false);

  const [subdomain, setSubdomain] = useState('');
  const [owner, setOwner] = useState('');

  const handleOnClick = () => {
    if (subdomain === '' || subdomain.match('[^a-z0-9]')) {
      return setLocalError(strings.invalid_name);
    }

    switch (validateAddress(owner)) {
      case 'Invalid address':
        return setLocalError('Invalid address');
      case 'Invalid checksum':
        return setChecksumError(true);
      default:
        return handleClick(subdomain, owner);
    }
  };

  const handleChecksum = (value) => {
    setOwner(value);
    setChecksumError(false);
    handleErrorClose();
    handleClick(subdomain, value);
  };

  const handleErrorClick = () => {
    setLocalError('');
    handleErrorClose();
  };

  if (confirmedTx !== '' && owner !== '') {
    setOwner('');
    setSubdomain('');
  }

  const disabled = newRequesting || newWaiting;

  return (
    <div>
      <Row>
        <Col>
          <h3 className="blue caps-first">{strings.admin_your_domain_action_3}</h3>
        </Col>
      </Row>
      <Row className="minor-section">
        <Col md={2}>
          {strings.name}
        </Col>
        <Col md={5}>
          <input
            placeholder={strings.type_sudomain}
            value={subdomain}
            onChange={evt => setSubdomain(evt.target.value)}
            className="subdomain"
            disabled={disabled}
          />
        </Col>
        <Col md={5}>
          <p className="blue">
            {`.${domain}`}
          </p>
        </Col>
      </Row>
      <Row className="minor-section">
        <Col md={2}>
          {strings.owner}
        </Col>
        <Col md={8}>
          <input
            placeholder={strings.type_owners_address}
            value={owner}
            onChange={evt => setOwner(evt.target.value)}
            className="owner"
            disabled={disabled}
          />
        </Col>
        <Col>
          <Button
            onClick={handleOnClick}
            disabled={disabled}
          >
            {strings.create}
          </Button>
        </Col>
      </Row>

      <ChecksumErrorContainer
        show={checksumError}
        inputValue={owner}
        handleClick={value => handleChecksum(value)}
      />

      <UserErrorComponent
        visible={errorMessage !== '' || localError !== ''}
        message={errorMessage || localError}
        handleCloseClick={() => handleErrorClick()}
      />

      <UserSuccessComponent
        visible={confirmedTx !== ''}
        message={strings.subdomain_has_been_registered}
        address={confirmedTx}
        handleCloseClick={() => handleSuccessClose()}
      />

      <UserWaitingComponent
        visible={newWaiting === true}
        message={strings.wait_transation_confirmed}
      />
    </div>
  );
};

NewSubdomainComponent.propTypes = {
  strings: propTypes.shape({
    admin_your_domain_action_3: propTypes.string.isRequired,
    type_sudomain: propTypes.string.isRequired,
    type_owners_address: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    owner: propTypes.string.isRequired,
    create: propTypes.string.isRequired,
    invalid_name: propTypes.string.isRequired,
    subdomain_has_been_registered: propTypes.string.isRequired,
    wait_transation_confirmed: propTypes.string.isRequired,
  }).isRequired,
  domain: propTypes.string.isRequired,
  handleClick: propTypes.func.isRequired,
  handleErrorClose: propTypes.func.isRequired,
  errorMessage: propTypes.string.isRequired,
  confirmedTx: propTypes.string.isRequired,
  handleSuccessClose: propTypes.func.isRequired,
  newRequesting: propTypes.bool.isRequired,
  newWaiting: propTypes.bool.isRequired,
};

export default multilanguage(NewSubdomainComponent);
