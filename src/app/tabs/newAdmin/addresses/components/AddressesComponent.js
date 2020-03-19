import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { useDispatch } from 'react-redux';
import { getDomainResolver } from '../../resolver/operations';

const AddressesComponent = (props) => {
  const { domain, strings } = props;

  const dispatch = useDispatch();
  useEffect(() => dispatch(getDomainResolver(domain)), [dispatch]);

  return (
    <div>
      <h1>{strings.your_addresses}</h1>
      {domain}
    </div>
  );
};

AddressesComponent.propTypes = {
  strings: propTypes.shape({
    your_addresses: propTypes.string.isRequired,
  }).isRequired,
  domain: propTypes.string.isRequired,
};

export default multilanguage(AddressesComponent);
