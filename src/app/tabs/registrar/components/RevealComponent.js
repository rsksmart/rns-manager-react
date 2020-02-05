import React from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import {
  Button, Spinner,
} from 'react-bootstrap';

const RevealComponent = (props) => {
  const {
    waiting, strings, revealCommit, committed, revealed, revealing,
  } = props;

  return (
    <div>
      <h3>Registration Options</h3>
      <p><strong>THIS IS WHERE THE CHECKBOXES FOR REGISTER OPTIONS WILL GO!</strong></p>

      {
        revealing
          ? <Spinner animation="grow" variant="primary" />
          : (
            <Button
              disabled={!committed || waiting || revealed}
              onClick={revealCommit}
            >
              {strings.process_step_3}
            </Button>
          )
      }

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
  revealed: propTypes.bool.isRequired,
  committed: propTypes.bool.isRequired,
  revealing: propTypes.bool.isRequired,
};

export default multilanguage(RevealComponent);
