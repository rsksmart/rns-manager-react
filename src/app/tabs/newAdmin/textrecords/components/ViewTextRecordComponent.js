import React, { useState } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import {
  Button, Col,
} from 'react-bootstrap';

const ViewTextRecordComponent = ({
  handleClick,
}) => {
  const [state, setState] = useState({
    key: '',
  });

  return (
    <div className="row addressInput minor-section contract-abi-view">
      <div className="row textRecordview">
        <Col className="col-md-12 label">
          <p>Resolve txt record key if text record has been previously set:</p>
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
  );
};

ViewTextRecordComponent.propTypes = {
  handleClick: propTypes.func.isRequired,
};

export default multilanguage(ViewTextRecordComponent);
