/* eslint-disable prefer-destructuring */
import React, { useState } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Col } from 'react-bootstrap';

import TextRecordInputComponent from './TextRecordInputComponent';
import UserWaitingComponent from '../../../../components/UserWaitingComponent';
import UserErrorComponent from '../../../../components/UserErrorComponent';
import { TEXT_RECORD } from '../../resolver/types';

const NewRecordComponent = ({
  strings, content, handleSubmit, handleCloseMessage,
}) => {
  if (content.length === 0) {
    return <></>;
  }

  const [selectedContent, setSelectedContent] = useState(content[0][0]);

  const handleErrorClose = () => {
    handleCloseMessage(selectedContent);
  };

  // set the active options if exists, or select the top most
  const active = content.filter(c => c[0] === selectedContent);
  let activeOptions;
  if (active.length !== 0) {
    activeOptions = active[0][1];
  } else {
    activeOptions = content[0][1];
    setSelectedContent(content[0][0]);
  }

  const handleInputType = () => {
    switch (selectedContent) {
      case TEXT_RECORD: {
        return (
          <Col md="9">
            <TextRecordInputComponent
              handleClick={textValue => handleSubmit(TEXT_RECORD, textValue)}
              disabled={activeOptions.isWaiting}
            />
          </Col>
        );
      }
      default:
        return <></>;
    }
  };

  return (
    <div className="major-section add-records">
      <h3>{strings.add_text_records}</h3>
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
        {handleInputType()}
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
    add_text_records: propTypes.string.isRequired,
    content_bytes: propTypes.string.isRequired,
    wait_transation_confirmed: propTypes.string.isRequired,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  content: propTypes.array.isRequired,
  handleSubmit: propTypes.func.isRequired,
  handleCloseMessage: propTypes.func.isRequired,
};

export default multilanguage(NewRecordComponent);
