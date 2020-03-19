import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';

const AddressesComponent = (props) => {
  const { strings } = props;
  return (
    <div>
      <h1>{strings.your_addresses}</h1>
    </div>
  );
};

AddressesComponent.propTypes = {
  strings: propTypes.shape({
    your_addresses: propTypes.string.isRequired,
  }).isRequired,
};

export default multilanguage(AddressesComponent);
