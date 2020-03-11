import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import { checkIfSubdomainAndGetExpirationRemaining } from '../operations';
import { dayMath, formatDate } from '../../helpers';

const RenewButtonComponent = (props) => {
  const {
    domain, expires, handleClick, checkingExpirationTime, isRenewOpen,
    strings,
  } = props;

  const dispatch = useDispatch();
  useEffect(() => dispatch(checkIfSubdomainAndGetExpirationRemaining(domain)), []);

  if (checkingExpirationTime || expires === 0) {
    return (<></>);
  }

  return (
    <p>
      {strings.expires_on}
      {' '}
      {formatDate(dayMath(expires))}
      <Button onClick={handleClick} className={isRenewOpen ? 'active' : ''}>
        {strings.renew}
      </Button>
    </p>
  );
};

RenewButtonComponent.propTypes = {
  domain: propTypes.string.isRequired,
  expires: propTypes.number.isRequired,
  checkingExpirationTime: propTypes.bool.isRequired,
  isRenewOpen: propTypes.bool.isRequired,
  strings: propTypes.shape({
    expires_on: propTypes.string.isRequired,
    renew: propTypes.string.isRequired,
  }).isRequired,
  handleClick: propTypes.func.isRequired,
};

export default multilanguage(RenewButtonComponent);
