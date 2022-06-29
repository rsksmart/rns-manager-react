import React, { useState } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import {
  Button, Col,
} from 'react-bootstrap';

const SearchTextRecordComponent = ({
  handleClick, strings,
}) => {
  const [state, setState] = useState({
    key: '',
  });

  return (
    <div className="major-section records">
      <h3>{strings.search_text_records}</h3>
      <div className="row addressInput minor-section contract-abi-view">
        <div className="row textRecordview">
          <Col className="col-md-12 label">
            <p>Resolve txt record key if text record has been previously set:</p>
            <p>
              *Custom kets will be displayed in the custom keys table.
              Global keys allready displayd in the EIP keys table
            </p>
          </Col>
          <Col className="col-md-3 label">
            <Button
              md="3"
              className="save"
              onClick={() => handleClick(state)}
            >
              Search key
            </Button>
          </Col>
          <Col className="col-md-9">
            <label htmlFor="key">
              <input
                id="key"
                onChange={e => setState({ ...state, key: e.target.value })}
              />
            </label>
          </Col>
        </div>
      </div>
    </div>
  );
};

SearchTextRecordComponent.propTypes = {
  handleClick: propTypes.func.isRequired,
  strings: propTypes.shape({
    search_text_records: propTypes.string.isRequired,
  }).isRequired,
};

export default multilanguage(SearchTextRecordComponent);
