import React from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import { Row, Button } from 'react-bootstrap';

const AutoLoginComponent = (props) => {
  const { strings, handleManageClick, handleRegisterNewClick } = props;

  return (
    <>
      <Row>
        <div className="col-md-4 offset-md-4">
          <h2 className="blue">
            <svg width="37" height="23" viewBox="0 0 37 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 10.5L12.5 21L36 1" stroke="#008FF7" strokeWidth="2" />
            </svg>
            <br />
            Your domain has been registered
          </h2>
        </div>
      </Row>
      <Row className="major-section">
        <div className="col-md-3 offset-3">
          <Button onClick={handleManageClick}>
            Manage my domain
          </Button>
        </div>
        <div className="col-md-3">
          <Button onClick={handleRegisterNewClick}>
            Register new domain
          </Button>
        </div>
      </Row>
    </>
  );
};

AutoLoginComponent.propTypes = {
  strings: propTypes.shape({
    log_in: propTypes.string.isRequired,
  }).isRequired,
  handleManageClick: propTypes.func.isRequired,
  handleRegisterNewClick: propTypes.func.isRequired,
};

export default multilanguage(AutoLoginComponent);
