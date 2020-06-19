import React from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';

import {
  Row, Col, Container, Button,
} from 'react-bootstrap';

const ExpiredDomainComponent = ({ strings, handleClick }) => (
  <Container className="page">
    <Row className="domainInfo">
      <Col md={12} style={{ textAlign: 'center' }}>
        <h1 className="sub-heading">{strings.domain_expired}</h1>
        <Button onClick={handleClick}>
          {strings.search_for_domain}
        </Button>
      </Col>
    </Row>
  </Container>
);

ExpiredDomainComponent.propTypes = {
  strings: propTypes.shape({
    domain_expired: propTypes.string.isRequired,
    search_for_domain: propTypes.string.isRequired,
  }).isRequired,
  handleClick: propTypes.func.isRequired,
};

export default multilanguage(ExpiredDomainComponent);
