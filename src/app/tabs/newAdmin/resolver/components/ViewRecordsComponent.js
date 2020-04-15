import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';

import { EditContentContainer } from '../containers';

const ResolverComponent = ({ strings, start, content }) => {
  useEffect(() => start(), []);

  return (
    <div className="major-section records">
      <h2>{strings.records}</h2>
      <p>{strings.records_explanation}</p>
      {Object.entries(content).map((item) => {
        if (item[1].value !== '') {
          return (
            <EditContentContainer
              key={item[0]}
              label={strings[item[0].toLowerCase()]}
              value={item[1].value}
              validation={false}
              strings={{
                submit: strings.submit,
                cancel: strings.cancel,
                delete: strings.delete,
                delete_confirm_text: strings.delete_content_confirm,
                success_message: strings.content_updated,
              }}
            />
          );
        }
        return <></>;
      })}
    </div>
  );
};

ResolverComponent.propTypes = {
  strings: propTypes.shape({
    content_hash: propTypes.string.isRequired,
    records: propTypes.string.isRequired,
    records_explanation: propTypes.string.isRequired,
    submit: propTypes.string.isRequired,
    cancel: propTypes.string.isRequired,
    delete: propTypes.string.isRequired,
    delete_content_confirm: propTypes.string.isRequired,
    content_updated: propTypes.string.isRequired,
  }).isRequired,
  start: propTypes.func.isRequired,
  content: propTypes.shape.isRequired,
};

export default multilanguage(ResolverComponent);
