import React from 'react';
import propTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const UserDeleteComponent = ({ strings, isWaiting, handleClick }) => (
  <div className="delete">
    <p>{strings.delete_confirm_text}</p>
    <p>
      <Button
        className="cancel"
        onClick={() => handleClick('CANCEL')}
        disabled={isWaiting}
      >
        {strings.cancel}
      </Button>
      <Button
        className="submit"
        disabled={isWaiting}
        onClick={() => handleClick('SUBMIT')}
      >
        {strings.delete}
      </Button>
    </p>
  </div>
);

UserDeleteComponent.propTypes = {
  strings: propTypes.shape({
    delete_confirm_text: propTypes.string.isRequired,
    delete: propTypes.string.isRequired,
    cancel: propTypes.string.isRequired,
  }).isRequired,
  isWaiting: propTypes.bool.isRequired,
  handleClick: propTypes.func.isRequired,
};

export default UserDeleteComponent;
