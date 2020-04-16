import React from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import { Row, Button } from 'react-bootstrap';
import UserSuccessComponent from '../../../components/UserSuccessComponent';

const AutoLoginComponent = (props) => {
  const { strings, handleManageClick, handleRegisterNewClick } = props;

  return (
    <>
      <UserSuccessComponent
        title={strings.your_domain_has_been_registered}
        message=""
      />
      <Row className="major-section">
        <div className="col-md-4 offset-md-2 col-lg-3 offset-lg-3">
          <Button onClick={handleManageClick}>
            {strings.admin_domain}
          </Button>
        </div>
        <div className="col-md-4 col-lg-3">
          <Button onClick={handleRegisterNewClick}>
            {strings.register_another_domain}
          </Button>
        </div>
      </Row>
    </>
  );
};

AutoLoginComponent.propTypes = {
  strings: propTypes.shape({
    log_in: propTypes.string.isRequired,
    admin_domain: propTypes.string.isRequired,
    register_another_domain: propTypes.string.isRequired,
    your_domain_has_been_registered: propTypes.string.isRequired,
  }).isRequired,
  handleManageClick: propTypes.func.isRequired,
  handleRegisterNewClick: propTypes.func.isRequired,
};

export default multilanguage(AutoLoginComponent);
