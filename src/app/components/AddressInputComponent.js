import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import { validateAddress } from '../validations';
import { ChecksumErrorContainer } from '../containers';
import UserErrorComponent from './UserErrorComponent';
import UserSuccessComponent from './UserSuccessComponent';
import UserWaitingComponent from './UserWaitingComponent';

import edit from '../../assets/img/edit.svg';
import editActive from '../../assets/img/edit-active.svg';
import closeBlue from '../../assets/img/close-blue.svg';

const AddressInputComponent = ({
  allowDelete,
  label,
  labelDisplay,
  value,
  valueDisplay,
  isWaiting,
  isError,
  handleErrorClose,
  handleSuccessClose,
  handleSubmit,
  handleDelete,
  isSuccess,
  strings,
  successTx,
  reset,
  validationChainId,
  validation,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChecksumError, setIsChecksumError] = useState(false);
  const [isLocalError, setIsLocalError] = useState(false);
  const [editText, setEditText] = useState('');

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    setIsDeleting(false);
  };

  const handleDeleteClick = () => {
    setIsDeleting(!isDeleting);
    setIsEditing(false);
  };

  const confirmDelete = () => {
    handleDelete();
  };

  const handleErrorClick = () => {
    setIsLocalError('');
    handleErrorClose();
  };

  const handleSubmitClick = () => {
    if (!validation) {
      return handleSubmit(editText);
    }

    switch (validateAddress(editText, validationChainId || process.env.REACT_APP_ENVIRONMENT_ID)) {
      case 'Invalid address':
        return setIsLocalError('Invalid address');
      case 'Invalid checksum':
        return setIsChecksumError(true);
      default:
    }
    setIsLocalError(false);
    return handleSubmit(editText);
  };

  const handleTextChange = (evt) => {
    setEditText(evt.target.value);
  };

  const handleChecksumClick = () => {
    setEditText(editText.toLowerCase());
    setIsChecksumError(false);
    handleSubmitClick();
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setIsChecksumError(false);
  };

  if (reset && (isEditing || isDeleting)) {
    setIsEditing(false);
    setIsDeleting(false);
    setEditText('');
  }

  return (
    <div className="row addressInput">
      <div className="row view">
        <div className="col-md-3 label">
          {labelDisplay || label}
        </div>
        <div className={`${allowDelete ? 'col-md-7' : 'col-md-8'} value`}>
          {`${strings.value_prefix}`}
          {strings.value_prefix ? ': ' : ''}
          {valueDisplay || value}
        </div>
        <div className={`${allowDelete ? 'col-md-2' : 'col-md-1'} options`}>
          <button
            type="button"
            onClick={handleEditClick}
            className="edit"
            disabled={isWaiting}
          >
            <img src={(!isEditing ? edit : editActive)} alt={strings.edit} />
          </button>
          {allowDelete
            && (
            <button
              type="button"
              onClick={handleDeleteClick}
              className="delete"
              disabled={isWaiting}
            >
              <img src={closeBlue} alt={strings.delete} />
            </button>
            )
          }
        </div>
      </div>
      {isEditing
        && (
        <div className="row edit">
          <div className="col-md-2 editLabel">
            {strings.edit_propmt}
          </div>
          <div className="col-md-6">
            <input
              type="text"
              placeholder={strings.edit_placeholder}
              value={editText}
              onChange={handleTextChange}
              disabled={isWaiting}
            />
          </div>
          <div className="col-md-4 buttons">
            <Button
              className="cancel"
              onClick={() => handleCancelClick()}
              disabled={isWaiting}
            >
              {strings.cancel}
            </Button>
            <Button
              className="submit"
              disabled={isWaiting}
              onClick={handleSubmitClick}
            >
              {strings.submit}
            </Button>
          </div>
        </div>
        )
      }
      {isChecksumError
        && (
          <div className="checksumError">
            <ChecksumErrorContainer
              show={isChecksumError}
              inputValue={editText}
              handleClick={() => handleChecksumClick()}
            />
          </div>
        )
      }
      {isDeleting
        && (
          <div className="delete">
            <p>{strings.delete_confirm_text}</p>
            <p>
              <Button
                className="cancel"
                onClick={() => setIsDeleting(false)}
                disabled={isWaiting}
              >
                {strings.cancel}
              </Button>
              <Button
                className="submit"
                disabled={isWaiting}
                onClick={confirmDelete}
              >
                {strings.delete}
              </Button>
            </p>
          </div>
        )
      }

      <UserWaitingComponent
        message={strings.waiting}
        visible={isWaiting}
      />

      <UserErrorComponent
        title={strings.error_title}
        message={isLocalError || strings.error_message}
        handleCloseClick={() => handleErrorClick()}
        visible={isError || isLocalError}
      />

      <UserSuccessComponent
        title={strings.success_title}
        message={strings.success_message}
        handleCloseClick={handleSuccessClose}
        address={successTx}
        visible={isSuccess}
      />
    </div>
  );
};

AddressInputComponent.defaultProps = {
  allowDelete: true,
  isError: false,
  isWaiting: false,
  isSuccess: false,
  reset: false,
  successTx: '',
  validationChainId: '',
  validation: true,
  strings: {
    cancel: 'Cancel',
    delete: 'Delete',
    delete_confirm_text: 'Are you sure you want to delete?',
    edit: 'Edit',
    edit_placeholder: 'enter address',
    edit_propmt: 'Change ownership',
    error_title: 'Error Title',
    error_message: 'Error Message',
    submit: 'Submit',
    success_title: 'Success Title',
    success_message: 'Success Message',
    value_prefix: 'Owner',
    waiting: 'Waiting text',
  },
  handleDelete: () => {},
  handleErrorClose: () => {},
  handleSuccessClose: () => {},
  labelDisplay: null,
  valueDisplay: null,
};

AddressInputComponent.propTypes = {
  allowDelete: propTypes.bool,
  label: propTypes.string.isRequired,
  labelDisplay: propTypes.string,
  isError: propTypes.bool,
  isWaiting: propTypes.bool,
  isSuccess: propTypes.bool,
  reset: propTypes.bool,
  validation: propTypes.bool,
  successTx: propTypes.string,
  handleErrorClose: propTypes.func,
  handleSuccessClose: propTypes.func,
  handleSubmit: propTypes.func.isRequired,
  handleDelete: propTypes.func,
  value: propTypes.string.isRequired,
  valueDisplay: propTypes.string,
  validationChainId: propTypes.string,
  strings: propTypes.shape(),
};

export default AddressInputComponent;
