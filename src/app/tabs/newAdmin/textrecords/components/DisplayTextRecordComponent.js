import React, { useState } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Button } from 'react-bootstrap';
import TextRecordInputComponent from './TextRecordInputComponent';
import { TEXT_RECORD } from '../../resolver/types';

const DisplayTextRecordComponent = ({
  value, handleSubmit,
}) => {
  const filteredValues = value.filter(c => c.result !== '');
  const [isShown, setIsShown] = useState(false);
  const handleClick = () => {
    setIsShown(current => !current);
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
                <Button
                  md="3"
                  onClick={() => handleClick(e.id)}
                >
                  EDIT
                </Button>
                {isShown && (
                  <TextRecordInputComponent
                    handleClick={row => handleSubmit(TEXT_RECORD, row)}
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
  handleSubmit: propTypes.arrayOf.isRequired,
};

export default multilanguage(DisplayTextRecordComponent);
