import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';

import closeBlue from '../../assets/img/close-blue.svg';
import blueCheck from '../../assets/img/check-blue.svg';

const UserSuccessComponent = (props) => {
  const {
    strings, title, message, handleCloseClick, address,
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
      <p>
        <img src={blueCheck} alt="" />
      </p>
      <p><strong>{title}</strong></p>
      <p>{message}</p>
      {address && (
        <p className="explorer">
          <a
            href={`${process.env.REACT_APP_BLOCK_EXPLORER}/address/${address}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {strings.view_explorer}
          </a>
        </p>
      )}
    </div>
  );
};

UserSuccessComponent.defaultProps = {
  title: 'Success',
  message: 'Success Message',
  handleCloseClick: () => {},
  address: '',
};

UserSuccessComponent.propTypes = {
  strings: propTypes.shape({
    close: propTypes.string.isRequired,
    view_explorer: propTypes.string.isRequired,
  }).isRequired,
  title: propTypes.string,
  message: propTypes.string,
  handleCloseClick: propTypes.func,
  address: propTypes.string,
};

export default multilanguage(UserSuccessComponent);