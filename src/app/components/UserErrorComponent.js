import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';

import { ERROR_SAME_VALUE } from '../tabs/newAdmin/types';
import { ERROR_RESOLVE_NAME } from '../tabs/resolve/types';
import { ADDRESS_ENCODING_ERROR } from '../tabs/newAdmin/addresses/types';

import closeRed from '../../assets/img/close-red.svg';

const UserErrorComponent = ({
  title, message, handleCloseClick, strings, visible,
}) => {
  if (!visible) {
    return (<></>);
  }

  const formatMessage = () => {
    switch (message) {
      case ERROR_SAME_VALUE: return strings.same_value;
      case ERROR_RESOLVE_NAME: return strings.resolve_not_set;
      case ADDRESS_ENCODING_ERROR: return strings.could_not_encode_address;
      default: return message;
    }
  };

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
      <p>{formatMessage()}</p>
    </div>
  );
};

UserErrorComponent.defaultProps = {
  title: 'Error',
  message: 'Error Message',
  handleCloseClick: () => {},
  visible: true,
};

UserErrorComponent.propTypes = {
  strings: propTypes.shape({
    close: propTypes.string.isRequired,
    same_value: propTypes.string.isRequired,
    resolve_not_set: propTypes.string.isRequired,
    could_not_encode_address: propTypes.string.isRequired,
  }).isRequired,
  title: propTypes.string,
  message: propTypes.string,
  handleCloseClick: propTypes.func,
  visible: propTypes.bool,
};

export default multilanguage(UserErrorComponent);
