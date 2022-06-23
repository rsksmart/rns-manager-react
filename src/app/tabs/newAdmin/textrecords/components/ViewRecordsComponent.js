import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { DisplayTextRecordContainer } from '../containers';
import { TEXT_RECORD } from '../../resolver/types';
import UserWaitingComponent from '../../../../components/UserWaitingComponent';

const ViewRecordsComponent = ({ strings, content, gettingContent }) => {
  if (gettingContent) {
    return <UserWaitingComponent visible />;
  }

  const switchViewType = (item) => {
    if (item[1].isEmpty) {
      return <></>;
    }

    switch (item[0]) {
      case TEXT_RECORD:
        return (
          <DisplayTextRecordContainer
            key={item[0]}
            value={item[1].value}
          />
        );
        // return <h1>Here will be displayed the
        // values forthe global keys and local storage ones</h1>;
      default:
        return <></>;
    }
  };

  return (
    <div className="major-section records">
      <h1>{strings.text_records}</h1>
      <p>{strings.text_records_explanation}</p>
      <p><strong>{strings.text_records_local}</strong></p>
      {content.map(item => switchViewType(item))}
    </div>
  );
};

ViewRecordsComponent.propTypes = {
  strings: propTypes.shape({
    text_records: propTypes.string.isRequired,
    text_records_explanation: propTypes.string.isRequired,
    text_records_local: propTypes.string.isRequired,
    submit: propTypes.string.isRequired,
    cancel: propTypes.string.isRequired,
    delete: propTypes.string.isRequired,
    delete_content_confirm: propTypes.string.isRequired,
    content_updated: propTypes.string.isRequired,
  }).isRequired,
  gettingContent: propTypes.bool.isRequired,
  content: propTypes.shape.isRequired,
};

export default multilanguage(ViewRecordsComponent);
