import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';

import { PUBLIC_RESOLVER, MULTICHAIN_RESOLVER, STRING_RESOLVER } from '../types';
import { SetResolverContainer } from '../containers';

const ResolverComponent = ({
  strings, gettingResolver, resolverName,
}) => {
  const getResolverStringName = () => {
    switch (resolverName) {
      case PUBLIC_RESOLVER: return strings.public_resolver;
      case MULTICHAIN_RESOLVER: return strings.multichain_resolver;
      case STRING_RESOLVER: return strings.string_resolver;
      default: return strings.custom_resolver;
    };
  };

  return (
    <div className="resolver">
      <h2>{strings.records}</h2>
      <p>{strings.records_explanation}</p>

      <div className="setResolver">
        <h2>{strings.set_resolver}</h2>
        <p>{strings.set_resolver_explanation}</p>
        {!gettingResolver && (
          <SetResolverContainer
            label={getResolverStringName()}
            strings={{
              value_prefix: '',
              cancel: strings.cancel,
              submit: strings.set,
            }}
          />
        )}
      </div>
    </div>
  );
}

ResolverComponent.propTypes = {
  strings: propTypes.shape({
    records: propTypes.string.isRequired,
    records_explanation: propTypes.string.isRequired,
    resolver: propTypes.string.isRequired,
    set_resolver: propTypes.string.isRequired,
    set_resolver_explanation: propTypes.string.isRequired,
    cancel: propTypes.string.isRequired,
    set: propTypes.string.isRequired,
    public_resolver: propTypes.string.isRequired,
    multichain_resolver: propTypes.string.isRequired,
    string_resolver: propTypes.string.isRequired,
    custom_resolver: propTypes.string.isRequired,
  }).isRequired,
  gettingResolver: propTypes.bool.isRequired,
  resolverName: propTypes.string.isRequired,
};

export default multilanguage(ResolverComponent);
