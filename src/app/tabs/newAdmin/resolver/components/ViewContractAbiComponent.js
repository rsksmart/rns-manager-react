import React, { useState } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import Web3 from 'web3';
import { Button } from 'react-bootstrap';

import { UserWaitingComponent, UserErrorComponent, UserSuccessComponent } from '../../../../components';
import ContractAbiInputComponent from './ContractAbiInputComponent';
import edit from '../../../../../assets/img/edit.svg';
import editActive from '../../../../../assets/img/edit-active.svg';

const ViewContractAbiComponent = ({
  strings, value, handleClick, isWaiting, errorMessage, handleCloseClick, successTx,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const uncompressed = value.filter(i => i.id === 1)[0];
  const uri = value.filter(i => i.id === 8)[0];

  const prettyJson = (uncompressed && uncompressed.result)
    ? JSON.stringify(JSON.parse(Web3.utils.toAscii(uncompressed.result)), null, 2)
    : null;
  const prettyUri = (uri && uri.result && parseInt(uri.result, 16) !== 0)
    ? Web3.utils.toAscii(uri.result) : null;

  if (successTx && isEditing) {
    setIsEditing(false);
  }

  return (
    <div className="row addressInput minor-section contract-abi-view">
      <div className="row view">
        <div className="col-md-3 label">
          {strings.contract_abi}
          <div>
            <Button onClick={() => setIsEditing(!isEditing)}>
              <img src={(!isEditing ? edit : editActive)} alt={strings.edit} />
            </Button>
          </div>
        </div>

        {!isEditing && (
        <div className="col-md-9">
          {prettyJson && (
          <>
            <p>Contract ABI Value</p>
            <pre className="contractAbi">{prettyJson}</pre>
          </>
          )}

          {prettyUri && (
          <>
            <p>URI</p>
            <div className="uri">{prettyUri}</div>
          </>
          )}
          <p>Stored as:</p>
          <ul>
            {(prettyJson) && <li>JSON</li>}
            {(prettyUri) && <li>URI</li>}
          </ul>
        </div>
        )}

        {isEditing && (
          <div className="col-md-9">
            <ContractAbiInputComponent
              handleClick={data => handleClick(data)}
              disabled={isWaiting}
            />
          </div>
        )}
        {isWaiting && <UserWaitingComponent />}
        {errorMessage && (
        <UserErrorComponent
          message={errorMessage}
          handleCloseClick={() => handleCloseClick()}
        />
        )}
        {successTx && (
        <UserSuccessComponent
          message="Updated"
          address={successTx}
          handleCloseClick={() => handleCloseClick()}
        />
        )}
      </div>
    </div>
  );
};

ViewContractAbiComponent.defaultProps = {
  errorMessage: null,
  successTx: null,
};

ViewContractAbiComponent.propTypes = {
  strings: propTypes.shape({
    contract_abi: propTypes.string.isRequired,
    edit: propTypes.string.isRequired,
  }).isRequired,
  value: propTypes.shape({
    filter: propTypes.func.isRequired,
  }).isRequired,
  handleClick: propTypes.func.isRequired,
  isWaiting: propTypes.bool.isRequired,
  errorMessage: propTypes.string,
  handleCloseClick: propTypes.func.isRequired,
  successTx: propTypes.string,
};

export default multilanguage(ViewContractAbiComponent);
