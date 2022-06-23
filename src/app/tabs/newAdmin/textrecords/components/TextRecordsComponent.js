import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';

import { UserWaitingComponent } from '../../../../components';
import { ViewRecordsContainer, NewRecordContainer, SearchTextRecordsContainer } from '../containers';

const TextRecordsComponent = ({
  gettingResolver,
}) => {
  if (gettingResolver) {
    return <UserWaitingComponent />;
  }

  return (
    <div className="resolver">
      <ViewRecordsContainer />
      <SearchTextRecordsContainer />
      <NewRecordContainer />
    </div>
  );
};

TextRecordsComponent.propTypes = {
  gettingResolver: propTypes.bool.isRequired,
};

export default multilanguage(TextRecordsComponent);
