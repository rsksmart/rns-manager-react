import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { ViewTextRecordContainer } from '../containers';
import { TEXT_RECORD } from '../../resolver/types';
import UserWaitingComponent from '../../../../components/UserWaitingComponent';

const SearchTextRecordsComponent = ({ strings, content, gettingContent }) => {
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
          <ViewTextRecordContainer
            key={item[0]}
            value={item[1].value}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <div className="major-section records">
      <h3>{strings.search_text_records}</h3>
      {content.map(item => switchViewType(item))}
    </div>
  );
};

SearchTextRecordsComponent.propTypes = {
  strings: propTypes.shape({
    search_text_records: propTypes.string.isRequired,
    submit: propTypes.string.isRequired,
    cancel: propTypes.string.isRequired,
    delete: propTypes.string.isRequired,
    delete_content_confirm: propTypes.string.isRequired,
    content_updated: propTypes.string.isRequired,
  }).isRequired,
  gettingContent: propTypes.bool.isRequired,
  content: propTypes.shape.isRequired,
};

export default multilanguage(SearchTextRecordsComponent);
