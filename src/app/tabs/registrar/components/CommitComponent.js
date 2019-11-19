import React from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';

const CommitComponent = (props) => {
  const {
    committing, strings, doCommitment, committed,
  } = props;

  return (
    <Container>
      <Row>
        <Col md={6} className="offset-md-3">
          <p>
            2.
            {strings.process_step_1_explanation}
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          {
            committing
              ? <Spinner animation="grow" variant="primary" />
              : (
                <Button
                  disabled={committing || committed}
                  onClick={doCommitment}
                >
                  {strings.process_step_1}
                </Button>
              )
          }
        </Col>
      </Row>
      <Row>
        <Col md={8} className="offset-md-2">
          <i>
            {strings.process_step_2_explanation}
          </i>
        </Col>
      </Row>
    </Container>
  );
};

CommitComponent.propTypes = {
  strings: propTypes.shape({
    process_step_1: propTypes.string.isRequired,
    process_step_1_explanation: propTypes.string.isRequired,
    process_step_2_explanation: propTypes.string.isRequired,
  }).isRequired,
  doCommitment: propTypes.func.isRequired,
  committing: propTypes.bool.isRequired,
  committed: propTypes.bool.isRequired,
};

export default multilanguage(CommitComponent);
