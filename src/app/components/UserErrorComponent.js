import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';

import closeRed from '../../assets/img/close-red.svg';

const UserErrorComponent = (props) => {
  const {
    title, message, handleCloseClick, strings,
  } = props;

  return (
    <div className="error">
      <button
        type="button"
        className="close"
        onClick={handleCloseClick}
      >
        <img src={closeRed} alt={strings.close} />
      </button>
      <p><strong>{title}</strong></p>
      <p>{message}</p>
    </div>
  );
};

UserErrorComponent.defaultProps = {
  title: 'Error',
  message: 'Error Message',
  handleCloseClick: () => {},
};

UserErrorComponent.propTypes = {
  strings: propTypes.shape({
    close: propTypes.string.isRequired,
  }).isRequired,
  title: propTypes.string,
  message: propTypes.string,
  handleCloseClick: propTypes.func,
};

export default multilanguage(UserErrorComponent);
