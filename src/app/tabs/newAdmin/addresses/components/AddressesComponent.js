import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { useDispatch } from 'react-redux';
import { getDomainResolver } from '../../resolver/operations';
import { AddNewAddressContainer } from '../containers';

const AddressesComponent = (props) => {
  const { domain, strings } = props;

  const dispatch = useDispatch();
  useEffect(() => dispatch(getDomainResolver(domain)), [dispatch]);

  return (
    <div className="yourAddress">
      // if the user has public resolver show migrate to multi chain
      <br />
      // if user has multi, nothing to be done
      <br />
      // Other resolver, “you changed your resolver to the string resolver"
      <h1>{strings.your_addresses}</h1>
      // your addresses here

      <AddNewAddressContainer />
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
