import React from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import { Spinner, Button } from 'react-bootstrap';

const RevealComponent = (props) => {
  const {
    committing, strings, doCommitment, committed,
  } = props;

  if (committing) {
    return <Spinner animation="grow" variant="primary" />;
  }

  return (
    <div>
      <Button disabled={committed} onClick={doCommitment}>{strings.process_step_1}</Button>
      <p>
        {strings.process_step_1_explanation}
      </p>
    </div>
  );
};

RevealComponent.propTypes = {
  strings: propTypes.shape({
    process_step_1: propTypes.string.isRequired,
    process_step_1_explanation: propTypes.string.isRequired,
  }).isRequired,
  doCommitment: propTypes.func.isRequired,
  committing: propTypes.bool.isRequired,
  committed: propTypes.bool.isRequired,
};

export default multilanguage(RevealComponent);
