import React, { useState } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import {
  Row, Col, Form, Button,
} from 'react-bootstrap';

const ContractAbiInputComponent = ({ strings, handleClick, disabled }) => {
  const [state, setState] = useState({
    inputMethod: 'url',
    json: '',
    url: '',
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
            <option value="url">URL</option>
            <option value="text">Paste in JSON</option>
          </select>
        </label>
      </Col>
      <Col md="12">
        {state.inputMethod === 'text' && (
          <label htmlFor="json">
            Paste in the ABI in JSON format
            <textarea
              id="json"
              onChange={e => setState({ ...state, json: e.target.value })}
              value={state.json}
              disabled={disabled}
            />
          </label>
        )}
        {state.inputMethod === 'url' && (
          <label htmlFor="url">
            URL
            <input
              id="url"
              onChange={e => setState({ ...state, url: e.target.value })}
              placeholder="URL of the JSON abi file"
              value={state.url}
              disabled={disabled}
            />
          </label>
        )}
      </Col>
      <Col md="12">
        <p><strong>ABI encodings:</strong></p>
        <ul>
          {encodings.map(item => (
            <li>
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
          {state.inputMethod === 'url' && (
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
          className="add"
          onClick={() => handleClick(state)}
          disabled={disabled}
        >
          {strings.add}
        </Button>
      </Col>
    </Row>
  );
};

ContractAbiInputComponent.propTypes = {
  strings: propTypes.shape({
    add: propTypes.string.isRequired,
  }).isRequired,
  handleClick: propTypes.func.isRequired,
  disabled: propTypes.bool.isRequired,
};

export default multilanguage(ContractAbiInputComponent);
