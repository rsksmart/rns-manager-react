import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';

const ReverseComponent = (props) => {
  const { strings } = props;
  return (
    <div>
      <h1>{strings.reverse}!!!!!!!!</h1>
    </div>
  );
};

ReverseComponent.propTypes = {
  strings: propTypes.shape({
    reverse: propTypes.string.isRequired,
  }).isRequired,
};

export default multilanguage(ReverseComponent);
