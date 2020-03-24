import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';

import {
  Row, Col, Button, Spinner,
} from 'react-bootstrap';

import { UserErrorComponent } from '../../../../components';

const MigrateToMultiResolverComponent = ({
  strings, isWaiting, errorMessage, handleClick, handleCloseClick,
}) => {
  if (isWaiting) {
    return (<Spinner animation="grow" variant="primary" />);
  }

  return (
    <Row>
      <Col md={8} md-offset={2}>
        <p>{strings.migrate_multichain_resolver_message}</p>
        <Button onClick={handleClick}>
          {strings.migrate}
        </Button>
      </Col>
      <UserErrorComponent
        message={errorMessage}
        handleCloseClick={handleCloseClick}
        visible={errorMessage !== ''}
      />
    </Row>
  );
};

MigrateToMultiResolverComponent.propTypes = {
  strings: propTypes.shape({
    migrate_multichain_resolver_message: propTypes.string.isRequired,
    migrate: propTypes.string.isRequired,
  }).isRequired,
  isWaiting: propTypes.bool.isRequired,
  handleClick: propTypes.func.isRequired,
  handleCloseClick: propTypes.func.isRequired,
  errorMessage: propTypes.string.isRequired,
};

export default multilanguage(MigrateToMultiResolverComponent);
