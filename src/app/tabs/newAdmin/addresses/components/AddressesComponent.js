import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { useDispatch } from 'react-redux';

import { YourAddressesContainer, AddNewAddressContainer, MigrateToMultiResolverContainer } from '../containers';
import { getAllChainAddresses } from '../operations';
import {
  publicResolver as publicResolverAddress,
  stringResolver as stringResolverAddress,
} from '../../../../adapters/configAdapter';

const AddressesComponent = ({
  domain, resolverAddr, gettingResolver, strings,
}) => {
  if (gettingResolver) {
    return (<></>);
  }

  const dispatch = useDispatch();
  useEffect(() => dispatch(getAllChainAddresses(domain)), [dispatch]);
  const resolver = resolverAddr.toLowerCase();

  if (resolver === stringResolverAddress) {
    return <p>{strings.string_resolver_message}</p>
  }

  return (
    <div className="yourAddress">
      <YourAddressesContainer />
      <AddNewAddressContainer />
      {resolver === publicResolverAddress && <MigrateToMultiResolverContainer />}
    </div>
  );
};

AddressesComponent.propTypes = {
  strings: propTypes.shape({
    your_addresses: propTypes.string.isRequired,
    string_resolver_message: propTypes.string.isRequired,
  }).isRequired,
  domain: propTypes.string.isRequired,
  resolverAddr: propTypes.string.isRequired,
  gettingResolver: propTypes.bool.isRequired,
};

export default multilanguage(AddressesComponent);
