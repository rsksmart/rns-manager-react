import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';

import { UserWaitingComponent } from '../../../../components';
import {
  ViewGlobalRecordsContainer, ViewCustomRecordsContainer,
  NewTextRecordContainer, SearchTextRecordContainer,
} from '../containers';

const TextRecordsComponent = ({
  gettingResolver, strings,
}) => {
  if (gettingResolver) {
    return <UserWaitingComponent />;
  }

  return (
    <div className="resolver">
      <h1>{strings.text_records}</h1>
      <p>{strings.text_records_explanation}</p>
      <p><strong>{strings.text_records_local}</strong></p>
      <ViewGlobalRecordsContainer />
      <ViewCustomRecordsContainer />
      <SearchTextRecordContainer />
      <NewTextRecordContainer />
    </div>
  );
};

TextRecordsComponent.propTypes = {
  gettingResolver: propTypes.bool.isRequired,
  strings: propTypes.shape({
    text_records: propTypes.string.isRequired,
    text_records_explanation: propTypes.string.isRequired,
    text_records_local: propTypes.string.isRequired,
  }).isRequired,
};

export default multilanguage(TextRecordsComponent);
