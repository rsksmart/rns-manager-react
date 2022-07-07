import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Table } from 'react-bootstrap';
import EditDeleteTextRecordComponent from './EditDeleteTextRecordComponent';

const DisplayTextRecordComponent = ({
  value,
}) => {
  const filteredValues = value.filter(c => c.result !== '');
  return (
    <div>
      <Table responsive className="table table-bordered">
        <thead>
          <tr>
            <th>Key</th>
            <th>Text Record Value</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredValues.map(e => (
            <EditDeleteTextRecordComponent
              key={e.id}
              value={e}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};
DisplayTextRecordComponent.propTypes = {
  value: propTypes.arrayOf.isRequired,
};

export default multilanguage(DisplayTextRecordComponent);
