import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Alert } from 'react-bootstrap';
import UserWaitingComponent from '../../../../components/UserWaitingComponent';

export const contentHashPlaceholder = 'ipfs://..., ipns://..., bzz://..., onion://..., onion3://...';

const MyUrlComponent = ({
  start, strings, url, receiveContent, handleSave,
}) => {
  useEffect(() => {
    start();
  }, []);
  const [newInput, setNewInput] = useState('');

  if (!receiveContent) {
    return <UserWaitingComponent visible />;
  }

  if (!url) {
    return (
      <>
        <h1>{strings.decentralized_url}</h1>
        <Alert key="decode" variant="warning">Your resolver does not support decentralized URL.</Alert>
      </>
    );
  }

  return (
    <div>
      <h1>{strings.decentralized_url}</h1>
      <p>{strings.decentralized_exp}</p>

      {url.isEmpty && (
        <div className="new">
          <input
            className="newInput"
            type="text"
            value={newInput}
            onChange={evt => setNewInput(evt.target.value)}
            placeholder={contentHashPlaceholder}
          />
          <button type="button" className="btn btn-primary" onClick={() => handleSave(newInput)}>Add</button>

          {url.errorMessage && <div className="error">{url.errorMessage}</div>}
          {url.isWaiting && <UserWaitingComponent visible />}
        </div>
      )}
    </div>
  );
};

MyUrlComponent.defaultProps = {
  url: null,
};

MyUrlComponent.propTypes = {
  strings: propTypes.shape().isRequired,
  start: propTypes.func.isRequired,
  url: propTypes.shape(),
  receiveContent: propTypes.bool.isRequired,
  handleSave: propTypes.func.isRequired,
};

export default multilanguage(MyUrlComponent);
