import React from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import {
  Button,
} from 'react-bootstrap';

const RevealComponent = (props) => {
  const {
    waiting, strings, revealCommit, committed, revealing,
    revealed, revealConfirmed,
  } = props;

  return (
    <div>
      <p>
        {strings.process_step_3_explanation}
      </p>
      <Button
        disabled={!committed || waiting || revealed}
        onClick={revealCommit}
      >
        {strings.process_step_3}
      </Button>
    </div>
  );
};

RevealComponent.propTypes = {
  strings: propTypes.shape({
    process_step_3: propTypes.string.isRequired,
    process_step_3_explanation: propTypes.string.isRequired,
    process_step_2_explanation: propTypes.string.isRequired,
    register: propTypes.string.isRequired,
  }).isRequired,
  revealCommit: propTypes.func.isRequired,
  waiting: propTypes.bool.isRequired,
  revealConfirmed: propTypes.bool,
  revealing: propTypes.bool.isRequired,
  revealed: propTypes.bool.isRequired,
  committed: propTypes.bool.isRequired,
};

RevealComponent.defaultProps = {
  revealConfirmed: false,
};

export default multilanguage(RevealComponent);
