import React from 'react';
import propTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';
import { StartButton } from '..';

const AuthTabComponent = ({ strings, isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return (
      <Container>
        <Row>
          <Col>
            <p>{strings.please_log_in}</p>
            <StartButton />
          </Col>
        </Row>
      </Container>
    );
  }

  return children;
};

AuthTabComponent.propTypes = {
  strings: propTypes.shape({
    please_log_in: propTypes.string.isRequired,
  }).isRequired,
  isLoggedIn: propTypes.bool.isRequired,
  children: propTypes.node.isRequired,
};

export default multilanguage(AuthTabComponent);
