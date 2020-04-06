import React from 'react';
import { multilanguage } from 'redux-multilanguage';

import { Row, Button } from 'react-bootstrap';

const SearchBoxComponent = ({ strings }) => {
  return (
    <Row className="searchBox">
      <div className="col-md-7 offset-md-1 searchInput">
        <input
          placeholder={strings.search_placeholder}
        />
        <span className="blue">.rsk</span>
      </div>
      <div className="col-md-3">
        <Button>
          {strings.search}
        </Button>
      </div>
    </Row>
  );
};

export default multilanguage(SearchBoxComponent);
