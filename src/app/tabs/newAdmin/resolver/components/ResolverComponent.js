import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';

import { SetResolverContainer } from '../containers';

const ResolverComponent = ({
  strings, gettingResolver,
}) => {
  return (
    <div>
      <h1>{strings.resolver}</h1>
      <h2>{strings.records}</h2>

      <h2>{strings.set_resolver}</h2>
      <p>{strings.set_resolver_explanation}</p>
      {!gettingResolver && <SetResolverContainer />}
    </div>
  );
};

ResolverComponent.propTypes = {
  strings: propTypes.shape({
    records: propTypes.string.isRequired,
    resolver: propTypes.string.isRequired,
    set_resolver: propTypes.string.isRequired,
    set_resolver_explanation: propTypes.string.isRequired,
  }).isRequired,
  gettingResolver: propTypes.bool.isRequired,
};

export default multilanguage(ResolverComponent);
