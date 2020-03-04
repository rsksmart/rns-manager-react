import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';

const SubdomainsComponent = (props) => {
  const { strings } = props;
  return (
    <div>
      <h1>{strings.subdomains}</h1>
    </div>
  );
};

SubdomainsComponent.propTypes = {
  strings: propTypes.shape({
    subdomains: propTypes.string.isRequired,
  }).isRequired,
};

export default multilanguage(SubdomainsComponent);
