import React from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import { Spinner, Button } from 'react-bootstrap';

const CommitComponent = (props) => {
  const {
    committing, strings, doCommitment, committed,
  } = props;

  if (committing) {
    return <Spinner animation="grow" variant="primary" />;
  }

  return <Button disabled={committed} onClick={doCommitment}>{strings.commit}</Button>;
};

CommitComponent.propTypes = {
  strings: propTypes.shape({
    commit: propTypes.string.isRequired,
  }).isRequired,
  doCommitment: propTypes.func.isRequired,
  committing: propTypes.bool.isRequired,
  committed: propTypes.bool.isRequired,
};

export default multilanguage(CommitComponent);
