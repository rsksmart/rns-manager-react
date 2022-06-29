import React, { useState } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Button } from 'react-bootstrap';
import { DisplayTextRecordContainer } from '../containers';
import { TEXT_RECORD } from '../../resolver/types';
import UserWaitingComponent from '../../../../components/UserWaitingComponent';

const ViewGlobalRecordsComponent = ({ content, gettingContent }) => {
  if (gettingContent) {
    return <UserWaitingComponent visible />;
  }
  const [isShown, setIsShown] = useState(false);
  const handleClick = () => {
    setIsShown(current => !current);
  };

  React.useEffect(() => {
  });
  const switchViewType = (item) => {
    if (item[1].isEmpty) {
      return <></>;
    }
    const eipKeys = ['email', 'url', 'avatar', 'description', 'notice', 'keywords', 'com.discord', 'com.github', 'com.reddit', 'com.twitter ', 'org.telegram'];
    const filteredValuesGlobalKeys = item[1].value.filter(c => eipKeys.includes(c.id));

    switch (item[0]) {
      case TEXT_RECORD:
        return (
          <>
            <p>
              <strong>EIP-634 GLOBAL, SERVICE AND LEGACY KEYS</strong>
              {'    '}
              <Button onClick={handleClick}>Show/Hide keys</Button>
            </p>
            {isShown && (
            <DisplayTextRecordContainer
              key={filteredValuesGlobalKeys.id}
              value={filteredValuesGlobalKeys}
            />
            )}
            {!isShown && ''}
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <div className="major-section records">
      {content.map(item => switchViewType(item))}
    </div>
  );
};

ViewGlobalRecordsComponent.propTypes = {
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

export default multilanguage(ViewGlobalRecordsComponent);
