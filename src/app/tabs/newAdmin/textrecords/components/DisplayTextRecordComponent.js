import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';

const ViewTextRecordComponent = ({
  value,
}) => {
  const filteredValues = value.filter(c => c.result !== '');

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Key</th>
          <th>Text Record Value</th>
        </tr>
      </thead>
      <tbody>
        {filteredValues.map((e, index) => (
          <tr data-index={index}>
            <td>{e.id}</td>
            <td>{e.result}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

ViewTextRecordComponent.propTypes = {
  value: propTypes.arrayOf.isRequired,
};

export default multilanguage(ViewTextRecordComponent);
