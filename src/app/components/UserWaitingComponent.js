import React from 'react';
import propTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';

const UserWaitingComponent = ({ message, visible }) => {
  if (!visible) {
    return (<></>);
  }

  return (
    <div className="row waiting">
      <div className="col-md-6 offset-md-3">
        <Spinner animation="grow" variant="primary" />
        <p>{message}</p>
      </div>
    </div>
  );
};

UserWaitingComponent.defaultProps = {
  message: '',
  visible: true,
};

UserWaitingComponent.propTypes = {
  message: propTypes.string,
  visible: propTypes.bool,
};

export default UserWaitingComponent;
