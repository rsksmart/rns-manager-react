import React, { useState } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';

import {
  Row, Col, Button, Form, Alert,
} from 'react-bootstrap';

import { UserErrorComponent, UserWaitingComponent } from '../../../../components';
import { MULTICHAIN_RESOLVER, DEFINITIVE_RESOLVER } from '../../resolver/types';

const MigrateToMultiResolverComponent = ({
  strings, isEditing, isWaiting, errorMessage, handleClick, handleCloseClick, resolverName,
  isMigrating, decodingErrors, hasAddresses, clearMigrateWarning, contentBytes, isWalletConnect,
}) => {
  const isMultiChainResolver = resolverName === MULTICHAIN_RESOLVER;
  const isDecodingErrors = decodingErrors.length !== 0;

  const [migrateAddresses, setMigrateAddresses] = useState(isMultiChainResolver && !isWalletConnect);
  const [understandWarning, setUnderstandWarning] = useState(isDecodingErrors);

  const handleMigrateAddressSwitch = () => {
    setMigrateAddresses(!migrateAddresses);
    clearMigrateWarning();
  };

  if (resolverName === DEFINITIVE_RESOLVER) {
    return (<></>);
  }

  return (
    <>
      <Row className="break-above">
        <Col>
          <h3 className="blue">
            {strings.multi_coin_addresses}
          </h3>
        </Col>
      </Row>
      <Row>
        <Col md={10}>
          <p>{strings.migrate_to_multi_resolver}</p>
          {(isMultiChainResolver && (hasAddresses || contentBytes)) && (
            <p>
              <Form.Check
                type="switch"
                id="migrate-addr-switch"
                label={!isWalletConnect ? strings.migrate_addresses_during : (
                  <>
                    {strings.migrate_addresses_during}
                    <strong>{` ${strings.wallet_connect_feature}`}</strong>
                  </>
                )}
                checked={migrateAddresses}
                onChange={handleMigrateAddressSwitch}
                disabled={isEditing || isMigrating || isWalletConnect}
              />
            </p>
          )}
        </Col>
        <Col md={2}>
          <Button
            onClick={() => handleClick(migrateAddresses, understandWarning)}
            className="migrate"
            disabled={isEditing || isMigrating || (isDecodingErrors && !understandWarning)}
          >
            {strings.activate}
          </Button>
        </Col>
      </Row>

      {(isDecodingErrors && !isWaiting) && (
      <Alert key="decode" variant="warning">
        <h2>{strings.warning}</h2>
        <p>{strings.decode_warning_explanation}</p>
        <ul>
          {decodingErrors.map(item => (
            <li key={item.chainId}>
              {item.chainName}
            </li>
          ))}
        </ul>
        <p>
          <Form.Check
            type="switch"
            id="understand-addr-switch"
            label={strings.understand_warning}
            checked={understandWarning}
            disabled={isMigrating}
            onChange={() => setUnderstandWarning(!understandWarning)}
          />
        </p>
      </Alert>
      )}

      <Row>
        <UserWaitingComponent
          message={strings.wait_transation_confirmed}
          visible={isWaiting}
        />
        <UserErrorComponent
          message={errorMessage}
          handleCloseClick={handleCloseClick}
          visible={errorMessage !== ''}
        />
      </Row>
    </>
  );
};

MigrateToMultiResolverComponent.propTypes = {
  strings: propTypes.shape({
    multi_coin_addresses: propTypes.string.isRequired,
    migrate_to_multi_resolver: propTypes.string.isRequired,
    activate: propTypes.string.isRequired,
    wait_transation_confirmed: propTypes.string.isRequired,
    migrate_addresses_during: propTypes.string.isRequired,
    warning: propTypes.string.isRequired,
    decode_warning_explanation: propTypes.string.isRequired,
    understand_warning: propTypes.string.isRequired,
    wallet_connect_feature: propTypes.string.isRequired,
  }).isRequired,
  isWaiting: propTypes.bool.isRequired,
  isEditing: propTypes.bool.isRequired,
  handleClick: propTypes.func.isRequired,
  handleCloseClick: propTypes.func.isRequired,
  errorMessage: propTypes.string.isRequired,
  resolverName: propTypes.string.isRequired,
  isMigrating: propTypes.bool.isRequired,
  decodingErrors: propTypes.arrayOf({
    chainId: propTypes.string,
    chainName: propTypes.string,
    error: propTypes.string,
  }).isRequired,
  hasAddresses: propTypes.bool.isRequired,
  clearMigrateWarning: propTypes.func.isRequired,
  contentBytes: propTypes.shape({}).isRequired,
  isWalletConnect: propTypes.bool.isRequired,
};

export default multilanguage(MigrateToMultiResolverComponent);
