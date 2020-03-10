import React from 'react';
import propTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';

const UserWaitingComponent = ({ message }) => (
  <div className="row waiting">
    <div className="col-md-6 offset-md-3">
      <Spinner animation="grow" variant="primary" />
      <p>{message}</p>
    </div>
  </div>
);

UserWaitingComponent.propTypes = {
  message: propTypes.string.isRequired,
};

export default UserWaitingComponent;
