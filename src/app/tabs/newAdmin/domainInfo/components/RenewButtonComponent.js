import React from 'react';

import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import { dayMath, formatDate } from '../../helpers';

const RenewButtonComponent = (props) => {
  const {
    expires, handleClick, checkingExpirationTime, isRenewOpen,
    strings, isFifsMigrated,
  } = props;

  const disable = (checkingExpirationTime || expires <= 0 || !isFifsMigrated);

  return (
    <p>
      {disable ? strings.domain_expired : `${strings.expires_on} ${formatDate(dayMath(expires))}`}

      {!disable && (
        <Button onClick={handleClick} className={isRenewOpen ? 'active caps-first' : 'caps-first'} disabled={disable}>
          {strings.renew}
        </Button>
      )}
    </p>
  );
};

RenewButtonComponent.defaultProps = {
  expires: 0,
};

RenewButtonComponent.propTypes = {
  expires: propTypes.number,
  checkingExpirationTime: propTypes.bool.isRequired,
  isRenewOpen: propTypes.bool.isRequired,
  strings: propTypes.shape({
    expires_on: propTypes.string.isRequired,
    renew: propTypes.string.isRequired,
    domain_expired: propTypes.string.isRequired,
  }).isRequired,
  handleClick: propTypes.func.isRequired,
  isFifsMigrated: propTypes.bool.isRequired,
};

export default multilanguage(RenewButtonComponent);
