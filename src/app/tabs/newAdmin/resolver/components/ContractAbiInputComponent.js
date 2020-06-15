import React, { useState } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import {
  Row, Col, Form, Button,
} from 'react-bootstrap';

const ContractAbiInputComponent = ({ strings, handleClick, disabled }) => {
  const [state, setState] = useState({
    inputMethod: 'uri',
    jsonText: '',
    uri: '',
    encodings: {
      json: true,
      zlib: true,
      cbor: true,
      uri: true,
    },
  });

  const toggleSwitch = (event) => {
    setState({
      ...state,
      encodings: {
        ...state.encodings,
        [event.target.id]: !state.encodings[event.target.id],
      },
    });
  };

  const encodings = [
    { id: 'json', string: 'JSON' },
    { id: 'zlib', string: 'zlib-compressed JSON' },
    { id: 'cbor', string: 'CBOR' },
  ];

  return (
    <Row className="contractAbiInput">
      <Col md="12">
        <label htmlFor="change-submit-method">
          Submit Method
          <select
            id="change-submit-method"
            onChange={e => setState({ ...state, inputMethod: e.target.value })}
            disabled={disabled}
          >
            <option value="uri">URI</option>
            <option value="text">Paste in JSON</option>
          </select>
        </label>
      </Col>
      <Col md="12">
        {state.inputMethod === 'text' && (
          <label htmlFor="json">
            Paste in the ABI in JSON format
            <textarea
              id="jsonText"
              onChange={e => setState({ ...state, jsonText: e.target.value })}
              value={state.json}
              disabled={disabled}
            />
          </label>
        )}
        {state.inputMethod === 'uri' && (
          <label htmlFor="uriInput">
            URI
            <input
              id="uriInput"
              onChange={e => setState({ ...state, uri: e.target.value })}
              placeholder="URI of the JSON abi file"
              value={state.uri}
              disabled={disabled}
            />
          </label>
        )}
      </Col>
      <Col md="12">
        <p><strong>ABI encodings:</strong></p>
        <ul>
          {encodings.map(item => (
            <li key={item.id}>
              <Form.Check
                type="switch"
                id={item.id}
                label={item.string}
                checked={state.encodings[item.id]}
                onChange={toggleSwitch}
                disabled={disabled}
              />
            </li>
          ))}
          {state.inputMethod === 'uri' && (
          <li>
            <Form.Check
              type="switch"
              id="uri"
              label="URI"
              checked={state.encodings.uri}
              onChange={toggleSwitch}
              disabled={disabled}
            />
          </li>
          )}
        </ul>
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

ContractAbiInputComponent.propTypes = {
  strings: propTypes.shape({
    submit: propTypes.string.isRequired,
  }).isRequired,
  handleClick: propTypes.func.isRequired,
  disabled: propTypes.bool.isRequired,
};

export default multilanguage(ContractAbiInputComponent);
