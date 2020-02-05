import React, { Component } from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import {
  Container, Row, Col, Spinner, Button,
} from 'react-bootstrap';

class CommitComponent extends Component {
  componentDidMount() {
    const { checkIfAlreadyCommitted } = this.props;
    checkIfAlreadyCommitted();
  }

  render() {
    const {
      committing, strings, doCommitment, committed, hasBalance,
    } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            {
              committing
                ? <Spinner animation="grow" variant="primary" />
                : (
                  <Button
                    disabled={committing || committed || !hasBalance}
                    onClick={doCommitment}
                  >
                    {strings.process_step_1}
                  </Button>
                )
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

CommitComponent.propTypes = {
  strings: propTypes.shape({
    process_step_1: propTypes.string.isRequired,
    process_step_1_explanation: propTypes.string.isRequired,
    process_step_2_explanation: propTypes.string.isRequired,
  }).isRequired,
  doCommitment: propTypes.func.isRequired,
  checkIfAlreadyCommitted: propTypes.func.isRequired,
  committing: propTypes.bool.isRequired,
  committed: propTypes.bool.isRequired,
  hasBalance: propTypes.bool.isRequired,
};

export default multilanguage(CommitComponent);
