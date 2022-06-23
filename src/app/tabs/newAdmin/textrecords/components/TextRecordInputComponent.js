import React, { useState } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import {
  Row, Col, Button,
} from 'react-bootstrap';

const TextRecordInputComponent = ({ strings, handleClick, disabled }) => {
  const [state, setState] = useState({
    key: '',
    value: '',
    encodings: {
      text: true,
    },
  });
  return (
    <Row className="textRecordInput">
      <Col md="12">
        <label htmlFor="key">
          Key
          <input type="text" list="key" onChange={e => setState({ ...state, key: e.target.value })} />
          <datalist
            id="key"
            onChange={e => setState({ ...state, key: e.target.value })}
          >
            <option value="email">email</option>
            <option value="url">url</option>
            <option value="avatar">avatar</option>
            <option value="description">description</option>
            <option value="notice">notice</option>
            <option value="keywords">keywords</option>
            <option value="com.discord">com.discord</option>
            <option value="com.github">com.github</option>
            <option value="com.reddit">com.reddit</option>
            <option value="com.twitter">com.twitter</option>
            <option value="org.telegram">org.telegram</option>
            {/*
            Hardcoded Key values based on EIP-634 and https://app.ens.domains/
            Commented out eth.ens.delegate for the moment.
            <option value="eth.ens.delegate">eth.ens.delegate</option>
           */}
          </datalist>
        </label>
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
