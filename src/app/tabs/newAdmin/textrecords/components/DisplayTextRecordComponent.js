import React, { useState } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
// import { Button } from 'react-bootstrap';
import TextRecordInputComponent from './TextRecordInputComponent';
import { TEXT_RECORD } from '../../resolver/types';
import edit from '../../../../../assets/img/edit.svg';
import editActive from '../../../../../assets/img/edit-active.svg';

const DisplayTextRecordComponent = ({
  value, handleSubmit, strings,
}) => {
  const filteredValues = value.filter(c => c.result !== '');
  const [selectedRow, setSelectedRow] = useState();

  const [isShown, setIsShown] = useState(true);
  const handleClick = (row) => {
    setIsShown(current => !current);
    setSelectedRow(row);
  };

  React.useEffect(() => {
  });
  return (
    <div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Key</th>
            <th>Text Record Value</th>
          </tr>
        </thead>
        <tbody>
          {filteredValues.map((e, index) => (
            <tr
              key={e.id}
              data-index={index}
              data-id={e.id}
            >
              <td>{e.id}</td>
              <td>{e.result}</td>
              <td>
                <div
                  aria-hidden="true"
                  md="3"
                  onClick={() => handleClick(e.id)}
                  onKeyDown={handleClick}
                >
                  <img src={(isShown ? editActive : edit)} alt={strings.edit} />
                </div>
                {isShown && (
                  <TextRecordInputComponent
                    handleClick={row => handleSubmit(TEXT_RECORD, row)}
                    value={selectedRow}
                  />
                )}
                {!isShown && ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
DisplayTextRecordComponent.propTypes = {
  value: propTypes.arrayOf.isRequired,
  strings: propTypes.shape({
    edit: propTypes.string.isRequired,
  }).isRequired,
  handleSubmit: propTypes.arrayOf.isRequired,
};

export default multilanguage(DisplayTextRecordComponent);
