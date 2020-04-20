import React from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import {
  Row, Button,
} from 'react-bootstrap';
import UserWaitingComponent from '../../../components/UserWaitingComponent';

const RevealComponent = (props) => {
  const {
    strings, revealCommit, revealing, domain,
  } = props;

  return (
    <>
      <Row>
        <div className="col-md-8 offset-md-2">
          <p>
            {strings.to_register}
            <span className="blue">{` ${domain}.rsk`}</span>
            <br />
            {strings.click_register_domain}
            <br />
            {strings.your_domain_will_be_registered}
          </p>
        </div>
      </Row>
      <Row>
        <UserWaitingComponent
          message={strings.wait_transation_confirmed}
          visible={revealing}
        />

        {!revealing
        && (
          <div className="col-md-4 offset-md-4">
            <Button
              disabled={revealing}
              onClick={revealCommit}
              className="minor-section"
            >
              {strings.register_domain}
            </Button>
          </div>
        )}
      </Row>
    </>
  );
};

RevealComponent.propTypes = {
  strings: propTypes.shape({
    register_domain: propTypes.string.isRequired,
    your_domain_will_be_registered: propTypes.string.isRequired,
    click_register_domain: propTypes.string.isRequired,
    register: propTypes.string.isRequired,
    to_register: propTypes.string.isRequired,
    wait_transation_confirmed: propTypes.string.isRequired,
  }).isRequired,
  revealCommit: propTypes.func.isRequired,
  revealing: propTypes.bool.isRequired,
  domain: propTypes.string.isRequired,
};

export default multilanguage(RevealComponent);
