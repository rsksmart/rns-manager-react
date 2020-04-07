import React from 'react';
import { multilanguage } from 'redux-multilanguage';

import { Row, Button } from 'react-bootstrap';

const SearchResultsComponent = ({ strings }) => {
  return (
    <Row className="resultsBox">
      RESULTS
    </Row>
  );
};

export default multilanguage(SearchResultsComponent);
