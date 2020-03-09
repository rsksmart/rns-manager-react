import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import { validateAddress } from '../validations';
import { ChecksumErrorContainer } from '../containers';

import edit from '../../assets/img/edit.svg';
import editActive from '../../assets/img/edit-active.svg';
import closeRed from '../../assets/img/close-red.svg';
import closeBlue from '../../assets/img/close-blue.svg';

const AddressInputComponent = (props) => {
  const {
    allowDelete,
    label,
    value,
    isWaiting,
    isError,
    handleErrorClose,
    handleSuccessClose,
    handleSubmit,
    handleDelete,
    isSuccess,
    strings,
  } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChecksumError, setIsChecksumError] = useState(false);
  const [isLocalError, setIsLocalError] = useState(false);
  const [editText, setEditText] = useState(value);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    setIsDeleting(false);
  };

  const handleDeleteClick = () => {
    setIsDeleting(!isDeleting);
    setIsEditing(false);
  };

  const confirmDelete = () => {
    setIsDeleting(false);
    setIsEditing(false);
    handleDelete();
  };

  const handleSubmitClick = () => {
    if (editText.endsWith('.rsk')) {
      console.log('isRSK address');
    }

    switch (validateAddress(editText)) {
      case 'Invalid address':
        setIsLocalError('Invalid address');
        return;
      case 'Invalid checksum':
        setIsChecksumError(true);
        return;
      default:
    }
    setIsLocalError(false);
    handleSubmit(editText);
  };

  const handleTextChange = (evt) => {
    setEditText(evt.target.value);
  };

  const handleChecksumClick = () => {
    setEditText(editText.toLowerCase());
    setIsChecksumError(false);
    handleSubmitClick();
  };

  return (
    <div className="row addressInput">
      <div className="row view">
        <div className="col-md-3 label">
          {label}
        </div>
        <div className={`${allowDelete ? 'col-md-7' : 'col-md-8'} value`}>
          {`${strings.value_prefix}: `}
          {value}
        </div>
        <div className={`${allowDelete ? 'col-md-2' : 'col-md-1'} options`}>
          <button type="button" onClick={handleEditClick} className="edit">
            <img src={(!isEditing ? edit : editActive)} alt={strings.edit} />
          </button>
          {allowDelete
            && (
            <button type="button" onClick={handleDeleteClick} className="delete">
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
              onClick={() => setIsEditing(false)}
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
      {isWaiting
        && (
          <div className="row waiting">
            <div className="col-md-6 offset-md-2">
              <p>{strings.waiting}</p>
            </div>
          </div>
        )
      }
      {(isError || isLocalError)
        && (
          <div className="error">
            <button
              type="button"
              className="close"
              onClick={handleErrorClose}
            >
              <img src={closeRed} alt={strings.close} />
            </button>
            <p><strong>{strings.error_title}</strong></p>
            <p>{isLocalError || strings.error_message}</p>
          </div>
        )
      }
      {isSuccess
        && (
          <div className="success">
            <button
              type="button"
              className="close"
              onClick={handleSuccessClose}
            >
              <img src={closeBlue} alt={strings.close} />
            </button>
            <p><strong>{strings.success_title}</strong></p>
            <p>{strings.success_message}</p>
          </div>
        )
      }
    </div>
  );
};

AddressInputComponent.defaultProps = {
  allowDelete: true,
  isError: false,
  isWaiting: false,
  isSuccess: false,
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
};

AddressInputComponent.propTypes = {
  allowDelete: propTypes.bool,
  label: propTypes.string.isRequired,
  isError: propTypes.bool,
  isWaiting: propTypes.bool,
  isSuccess: propTypes.bool,
  handleErrorClose: propTypes.func.isRequired,
  handleSuccessClose: propTypes.func.isRequired,
  handleSubmit: propTypes.func.isRequired,
  handleDelete: propTypes.func,
  value: propTypes.string.isRequired,
  strings: propTypes.shape(),
};

export default AddressInputComponent;
