import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';

import { YourAddressesContainer, AddNewAddressContainer, MigrateToMultiResolverContainer } from '../containers';
import UserWaitingComponent from '../../../../components/UserWaitingComponent';

import {
  UNKNOWN_RESOLVER, STRING_RESOLVER,
} from '../../resolver/types';

const AddressesComponent = ({
  gettingContent, resolverName, gettingResolver, strings,
}) => {
  if (gettingResolver || gettingContent) {
    return <UserWaitingComponent visible />;
  }

  if (resolverName === STRING_RESOLVER) {
    return <p>{strings.string_resolver_message}</p>;
  }

  if (resolverName === UNKNOWN_RESOLVER) {
    return <p>{strings.custom_resolver_message}</p>;
  }

  return (
    <div className="yourAddress">
      <YourAddressesContainer />
      <AddNewAddressContainer />
      <MigrateToMultiResolverContainer />
    </div>
  );
};

AddressesComponent.propTypes = {
  strings: propTypes.shape({
    your_addresses: propTypes.string.isRequired,
    string_resolver_message: propTypes.string.isRequired,
    custom_resolver_message: propTypes.string.isRequired,
  }).isRequired,
  resolverName: propTypes.string.isRequired,
  gettingResolver: propTypes.bool.isRequired,
  gettingContent: propTypes.bool.isRequired,
};

export default multilanguage(AddressesComponent);
