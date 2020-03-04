import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';

const DomainInfoComponent = (props) => {
  const { strings } = props;
  return (
    <div>
      <h1>{strings.domain_info}</h1>
    </div>
  );
};

DomainInfoComponent.propTypes = {
  strings: propTypes.shape({
    domain_info: propTypes.string.isRequired,
  }).isRequired,
};

export default multilanguage(DomainInfoComponent);
