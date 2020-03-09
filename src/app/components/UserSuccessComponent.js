import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';

import closeBlue from '../../assets/img/close-blue.svg';

const UserSuccessComponent = (props) => {
  const {
    strings, title, message, handleCloseClick,
  } = props;

  return (
    <div className="success">
      <button
        type="button"
        className="close"
        onClick={handleCloseClick}
      >
        <img src={closeBlue} alt={strings.close} />
      </button>
      <p><strong>{title}</strong></p>
      <p>{message}</p>
    </div>
  );
};

UserSuccessComponent.defaultProps = {
  title: 'Error',
  message: 'Error Message',
  handleCloseClick: () => {},
  strings: {
    close: 'Close',
  },
};

UserSuccessComponent.propTypes = {
  strings: propTypes.shape({
    close: propTypes.string,
  }),
  title: propTypes.string,
  message: propTypes.string,
  handleCloseClick: propTypes.func,
};

export default multilanguage(UserSuccessComponent);
