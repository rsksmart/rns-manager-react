import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import { checkIfSubdomainAndGetExpirationRemaining } from '../operations';
import { dayMath, formatDate } from '../../helpers';

const RenewButtonComponent = (props) => {
  const {
    domain, expires, handleClick, checkingExpirationTime, strings,
  } = props;

  const dispatch = useDispatch();
  useEffect(() => dispatch(checkIfSubdomainAndGetExpirationRemaining(domain)), [dispatch]);

  if (checkingExpirationTime) {
    return (<></>);
  }

  return (
    <p>
      {strings.expires_on}
      {' '}
      {formatDate(dayMath(expires))}
      <Button onClick={handleClick}>
        {strings.renew}
      </Button>
    </p>
  );
};

RenewButtonComponent.propTypes = {
  domain: propTypes.string.isRequired,
  expires: propTypes.string.isRequired,
  checkingExpirationTime: propTypes.bool.isRequired,
  strings: propTypes.shape({
    expires_on: propTypes.string.isRequired,
    renew: propTypes.string.isRequired,
  }).isRequired,
  handleClick: propTypes.func.isRequired,
};

export default multilanguage(RenewButtonComponent);
