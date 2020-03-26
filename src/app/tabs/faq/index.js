import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';

const FaqTabComponent = ({ strings }) => (
  <div>
    <h1 className="sub-heading">{strings.faq}</h1>
  </div>
);

FaqTabComponent.propTypes = {
  strings: propTypes.shape({
    faq: propTypes.string.isRequired,
  }).isRequired,
};

export default multilanguage(FaqTabComponent);
