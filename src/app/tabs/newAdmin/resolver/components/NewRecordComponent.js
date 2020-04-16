import React, { useState } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Button } from 'react-bootstrap';

import UserWaitingComponent from '../../../../components/UserWaitingComponent';
import UserErrorComponent from '../../../../components/UserErrorComponent';

const NewRecordComponent = ({
  strings, content, handleSubmit, handleCloseMessage,
}) => {
  if (content.length === 0) {
    return <></>;
  }

  const [value, setValue] = useState('');
  const [selectedContent, setSelectedContent] = useState(content[0][0]);

  const handleAddClick = () => {
    if (value === '') {
      return;
    }

    handleSubmit(selectedContent, value);
  };

  const handleErrorClose = () => {
    handleCloseMessage(selectedContent);
  };

  const activeOptions = content.filter(c => c[0] === selectedContent)[0][1];

  return (
    <div className="major-section add-records">
      <h3>{strings.add_records}</h3>
      <div className="row">
        <div className="col-md-3">
          <select
            onChange={evt => setSelectedContent(evt.target.value)}
            value={selectedContent}
            disabled={activeOptions.isWaiting}
          >
            {Object.entries(content).map((contentItem) => {
              const contentValue = contentItem[1][0];
              return (
                <option
                  key={contentValue}
                  value={contentValue}
                >
                  {strings[contentValue.toLowerCase()]}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-md-7">
          <input
            value={value}
            onChange={evt => setValue(evt.target.value)}
            disabled={activeOptions.isWaiting}
          />
        </div>
        <div className="col-md-2">
          <Button
            className="add"
            onClick={handleAddClick}
          >
            {strings.add}
          </Button>
        </div>
      </div>

      <UserWaitingComponent
        visible={activeOptions.isWaiting}
        message={strings.wait_transation_confirmed}
      />

      <UserErrorComponent
        visible={activeOptions.errorMessage !== ''}
        message={activeOptions.errorMessage}
        handleCloseClick={handleErrorClose}
      />
    </div>
  );
};

NewRecordComponent.propTypes = {
  strings: propTypes.shape({
    add: propTypes.string.isRequired,
    add_records: propTypes.string.isRequired,
    content_bytes: propTypes.string.isRequired,
    wait_transation_confirmed: propTypes.string.isRequired,
  }).isRequired,
  content: propTypes.shape().isRequired,
  handleSubmit: propTypes.func.isRequired,
  handleCloseMessage: propTypes.func.isRequired,
};

export default multilanguage(NewRecordComponent);
