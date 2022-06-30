import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Button } from 'react-bootstrap';

const DeleteValueForKeyComponent = ({
  strings, handleSubmit, isWaiting, value,
}) => {
  const newValue = {
    key: value ? value.id : '',
    value: value ? '' : '',
  };

  return (
    <Button
      className="submit"
      disabled={isWaiting}
      onClick={() => handleSubmit(newValue)}
    >
      {strings.delete}
    </Button>
  );
};

DeleteValueForKeyComponent.propTypes = {
  value: propTypes.arrayOf.isRequired,
  handleSubmit: propTypes.func.isRequired,
  strings: propTypes.shape({
    delete_confirm_text: propTypes.string.isRequired,
    delete: propTypes.string.isRequired,
    cancel: propTypes.string.isRequired,
  }).isRequired,
  isWaiting: propTypes.bool.isRequired,

};

export default multilanguage(DeleteValueForKeyComponent);
