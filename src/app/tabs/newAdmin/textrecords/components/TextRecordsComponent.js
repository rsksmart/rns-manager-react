import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';

import { UserWaitingComponent } from '../../../../components';
import {
  ViewGlobalRecordsContainer, ViewCustomRecordsContainer,
  NewTextRecordContainer, SearchTextRecordContainer,
} from '../containers';

const TextRecordsComponent = ({
  gettingResolver, strings, resolverName,
}) => {
  if (gettingResolver) {
    return <UserWaitingComponent />;
  }
  return (
    <>
      <div className="resolver">
        <h1>{strings.text_records}</h1>
        <p>{strings.text_records_explanation}</p>
        {resolverName === 'DEFINITIVE_RESOLVER' && (
          <>
            <p><strong>{strings.text_records_local}</strong></p>
            <ViewGlobalRecordsContainer />
            <ViewCustomRecordsContainer />
            <SearchTextRecordContainer />
            <NewTextRecordContainer />
          </>
        )}
        {resolverName !== 'DEFINITIVE_RESOLVER' && (
          <h1><italic>{strings.definitive_resolver_text_records}</italic></h1>
        )}
      </div>
    </>
  );
};

TextRecordsComponent.propTypes = {
  resolverName: propTypes.string.isRequired,
  gettingResolver: propTypes.bool.isRequired,
  strings: propTypes.shape({
    text_records: propTypes.string.isRequired,
    text_records_explanation: propTypes.string.isRequired,
    text_records_local: propTypes.string.isRequired,
    definitive_resolver_text_records: propTypes.string.isRequired,
  }).isRequired,
};

export default multilanguage(TextRecordsComponent);
