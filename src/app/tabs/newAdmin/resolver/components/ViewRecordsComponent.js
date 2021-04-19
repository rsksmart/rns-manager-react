import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { EditContentContainer, ViewContractAbiContainer } from '../containers';
import { CONTRACT_ABI } from '../types';
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
      case CONTRACT_ABI:
        return <ViewContractAbiContainer value={item[1].value} />;
      default:
        return (
          <EditContentContainer
            key={item[0]}
            label={strings[item[0].toLowerCase()]}
            value={item[1].value}
            validation={false}
            contentType={item[0]}
            strings={{
              submit: strings.submit,
              cancel: strings.cancel,
              delete: strings.delete,
              delete_confirm_text: strings.delete_content_confirm,
              success_message: strings.content_updated,
              edit_placeholder: '',
            }}
          />
        );
    }
  };

  return (
    <div className="major-section records">
      <h1>{strings.records}</h1>
      <p>{strings.records_explanation}</p>
      {content.map(item => switchViewType(item))}
    </div>
  );
};

ViewRecordsComponent.propTypes = {
  strings: propTypes.shape({
    content_bytes: propTypes.string.isRequired,
    records: propTypes.string.isRequired,
    records_explanation: propTypes.string.isRequired,
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
