import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';

const EditContractAbiComponent = ({ strings, value }) => {
  if (value.isEmpty) {
    return <></>;
  };

  return (
    <div className="row addressInput minor-section">
      <div className="row view">
        <div className="col-md-3 label">{strings.contract_abi}</div>
        <div className="col-md-7 value">
          {value.toString()}
        </div>
        <div className="col-md-2 options">
          edit/delete
        </div>
      </div>
    </div>
  );
};

EditContractAbiComponent.propTypes = {
  strings: propTypes.shape({
    contract_abi: propTypes.string.isRequired,
  }).isRequired,
  value: propTypes.shape({}).isRequired,
};

export default multilanguage(EditContractAbiComponent);
