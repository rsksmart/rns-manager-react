import React, { useState } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';

import {
  Row, Col, Button, Form,
} from 'react-bootstrap';

import { UserErrorComponent, UserWaitingComponent } from '../../../../components';

const MigrateToMultiResolverComponent = ({
  strings, isEditing, isWaiting, errorMessage, handleClick, handleCloseClick,
}) => {
  const [migrateAddresses, setMigrateAddresses] = useState(true);
  const handleChange = () => {
    console.log('handasd');
    setMigrateAddresses(!migrateAddresses);
  };
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
          <p>
            <Form.Check
              type="switch"
              label="Migrate my addresses during activation. This requires a second transaction."
              checked={migrateAddresses}
              onClick={handleChange}
            />
          </p>
        </Col>
        <Col md={2}>
          <Button
            onClick={handleClick}
            className="migrate"
            disabled={isEditing}
          >
            {strings.activate}
          </Button>
        </Col>
      </Row>
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
  }).isRequired,
  isWaiting: propTypes.bool.isRequired,
  isEditing: propTypes.bool.isRequired,
  handleClick: propTypes.func.isRequired,
  handleCloseClick: propTypes.func.isRequired,
  errorMessage: propTypes.string.isRequired,
};

export default multilanguage(MigrateToMultiResolverComponent);
