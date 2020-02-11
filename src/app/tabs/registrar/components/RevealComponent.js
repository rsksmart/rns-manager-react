import React from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import {
  Row, Button, Spinner,
} from 'react-bootstrap';

const RevealComponent = (props) => {
  const {
    strings, revealCommit, revealing, domain,
  } = props;

  return (
    <>
      <Row>
        <div className="col-md-6 offset-md-3">
          <p>
            To register
            <span className="blue">{` ${domain}.rsk`}</span>
            <br />
            {strings.process_step_3_explanation}
          </p>
        </div>
      </Row>
      <Row>
        <div className="col-md-4 offset-md-4">
          <Button
            disabled={revealing}
            onClick={revealCommit}
            className="minor-section"
          >
            {strings.process_step_3}
          </Button>

          {revealing
          && (
            <div>
              <Spinner animation="grow" variant="primary" className="major-section" />
              <p>It can take approximately 2 minutes to register your domain</p>
            </div>
          )
          }
        </div>
      </Row>
    </>
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
  revealing: propTypes.bool.isRequired,
  domain: propTypes.string.isRequired,
};

export default multilanguage(RevealComponent);
