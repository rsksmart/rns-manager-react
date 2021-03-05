import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';

const MyUrlComponent = ({ strings }) => {
  return (
    <div>
      <h1>{strings.decentralized_url}</h1>
      <p>{strings.decentralized_exp}</p>
    </div>
  );
};

MyUrlComponent.propTypes = {
  strings: propTypes.shape().isRequired,
};

export default multilanguage(MyUrlComponent);
