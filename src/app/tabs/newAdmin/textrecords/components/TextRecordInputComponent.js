import React, { useState } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import {
  Row, Col, Button,
} from 'react-bootstrap';
import { getEIPKeys } from '../../resolver/operations';

const TextRecordInputComponent = ({ strings, handleClick, disabled }) => {
  const [state, setState] = useState({
    key: '',
    value: '',
    encodings: {
      text: true,
    },
  });
  const eipKeys = getEIPKeys();
  return (
    <Row className="textRecordInput">
      <Col md="12">
        <label htmlFor="key">
          Key
          <input type="text" list="key" onChange={e => setState({ ...state, key: e.target.value })} />
        </label>
        <datalist
          id="key"
          onChange={e => setState({ ...state, key: e.target.value })}
        >
          {eipKeys.map(eipkey => (
            <option key={eipkey} value={eipkey} />
          ))}
        </datalist>
      </Col>
      <Col md="12">
        <label htmlFor="text">
          String
          <input
            id="value"
            onChange={e => setState({ ...state, value: e.target.value })}
            disabled={disabled}
          />
        </label>
      </Col>
      <Col sm="3">
        <Button
          className="save"
          onClick={() => handleClick(state)}
          disabled={disabled}
        >
          {strings.submit}
        </Button>
      </Col>
    </Row>
  );
};

TextRecordInputComponent.propTypes = {
  strings: propTypes.shape({
    submit: propTypes.string.isRequired,
  }).isRequired,
  handleClick: propTypes.func.isRequired,
  disabled: propTypes.bool.isRequired,
};

export default multilanguage(TextRecordInputComponent);
