import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';

import { UserWaitingComponent } from '../../../../components';
import {
  PUBLIC_RESOLVER, MULTICHAIN_RESOLVER, STRING_RESOLVER, DEFINITIVE_RESOLVER,
} from '../types';
import { SetResolverContainer, ViewRecordsContainer, NewRecordContainer } from '../containers';
import { MigrateToMultiResolverContainer } from '../../addresses/containers';
import { definitiveResolver } from '../../../../adapters/configAdapter';

const ResolverComponent = ({
  strings, gettingResolver, resolverName,
}) => {
  const getResolverStringName = () => {
    switch (resolverName) {
      case PUBLIC_RESOLVER: return strings.public_resolver;
      case MULTICHAIN_RESOLVER: return strings.multichain_resolver;
      case STRING_RESOLVER: return strings.string_resolver;
      case DEFINITIVE_RESOLVER: return 'Definitive Resolver';
      default: return strings.custom_resolver;
    }
  };

  if (gettingResolver) {
    return <UserWaitingComponent />;
  }

  return (
    <div className="resolver">
      <ViewRecordsContainer />
      <NewRecordContainer />

      <div className="setResolver">
        <h2>{strings.set_resolver}</h2>
        <p>{strings.set_resolver_explanation}</p>
        <SetResolverContainer
          label={getResolverStringName()}
          suggestions={[
            {
              name: strings.default_resolver,
              value: definitiveResolver,
            },
          ]}
          strings={{
            value_prefix: '',
            cancel: strings.cancel,
            submit: strings.set,
            edit_placeholder: strings.new_resolver_address,
            suggestion: strings.suggestion,
          }}
        />
      </div>
      <MigrateToMultiResolverContainer />
    </div>
  );
};

ResolverComponent.propTypes = {
  strings: propTypes.shape({
    resolver: propTypes.string.isRequired,
    set_resolver: propTypes.string.isRequired,
    set_resolver_explanation: propTypes.string.isRequired,
    cancel: propTypes.string.isRequired,
    set: propTypes.string.isRequired,
    public_resolver: propTypes.string.isRequired,
    multichain_resolver: propTypes.string.isRequired,
    string_resolver: propTypes.string.isRequired,
    custom_resolver: propTypes.string.isRequired,
    new_resolver_address: propTypes.string.isRequired,
    suggestion: propTypes.string.isRequired,
    default_resolver: propTypes.string.isRequired,
  }).isRequired,
  gettingResolver: propTypes.bool.isRequired,
  resolverName: propTypes.string.isRequired,
};

export default multilanguage(ResolverComponent);
