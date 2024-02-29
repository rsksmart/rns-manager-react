import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';

import { ERROR_SAME_VALUE } from '../tabs/newAdmin/types';
import { ERROR_RESOLVE_NAME } from '../tabs/resolve/types';
import { ADDRESS_ENCODING_ERROR } from '../tabs/newAdmin/addresses/types';
import { ERROR_NOT_ENOUGH_RIF } from '../tabs/registrar/types';
import { TRANSACTION_RECEIPT_FAILED } from '../types';

import closeRed from '../../assets/img/close-red.svg';

const UserErrorComponent = ({
  title,
  message,
  handleCloseClick,
  strings,
  visible,
}) => {
  if (!visible) {
    return <></>;
  }

  const truncateErrorMessage = (errorMessage) => {
    if (!errorMessage) {
      return errorMessage;
    }

    const index = errorMessage.indexOf('(');
    if (index !== -1) {
      const truncateMessage = errorMessage.substring(0, index);
      return truncateMessage === 'user rejected transaction '
        ? strings.user_rejected_tx : truncateMessage;
    }
    // Return the original string if no parenthesis is found
    return errorMessage;
  };

  const errorMessages = {
    [ERROR_SAME_VALUE]: strings.same_value,
    [ERROR_RESOLVE_NAME]: strings.resolve_not_set,
    [ADDRESS_ENCODING_ERROR]: strings.could_not_encode_address,
    [TRANSACTION_RECEIPT_FAILED]: strings.transaction_receipt_failed,
    [ERROR_NOT_ENOUGH_RIF]: strings.not_enough_rif_balance,
  };

  const formatMessage = () => errorMessages[message] || truncateErrorMessage(message);

  return (
    <div className="error">
      <button type="button" className="close" onClick={handleCloseClick}>
        <img src={closeRed} alt={strings.close} />
      </button>
      <p>
        <strong>{title}</strong>
      </p>
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
    transaction_receipt_failed: propTypes.string.isRequired,
    not_enough_rif_balance: propTypes.string.isRequired,
    user_rejected_tx: propTypes.string.isRequired,
  }).isRequired,
  title: propTypes.string,
  message: propTypes.string,
  handleCloseClick: propTypes.func,
  visible: propTypes.bool,
};

export default multilanguage(UserErrorComponent);
