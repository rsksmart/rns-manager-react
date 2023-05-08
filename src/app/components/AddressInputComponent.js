import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { toChecksumAddress } from 'rskjs-util';

import { ERROR_SAME_VALUE } from '../tabs/newAdmin/types';
import { validateAddress } from '../validations';
import ChecksumErrorComponent from './ChecksumErrorComponent';
import UserErrorComponent from './UserErrorComponent';
import UserSuccessComponent from './UserSuccessComponent';
import UserWaitingComponent from './UserWaitingComponent';

import edit from '../../assets/img/edit.svg';
import editActive from '../../assets/img/edit-active.svg';
import closeBlue from '../../assets/img/close-blue.svg';
import settings from '../../assets/img/settings.svg';

const AddressInputComponent = ({
  allowDelete,
  allowRsk,
  label,
  labelDisplay,
  labelIcon,
  value,
  isWaiting,
  isError,
  handleErrorClose,
  handleSuccessClose,
  handleSubmit,
  handleDelete,
  isSuccess,
  strings,
  successTx,
  validationChainId,
  validation,
  suggestions,
  settingsMenu,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChecksumError, setIsChecksumError] = useState(false);
  const [isLocalError, setIsLocalError] = useState(false);
  const [editText, setEditText] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  const handleButtonClick = (evt) => {
    const buttonName = evt.currentTarget.className;
    setIsEditing(buttonName === 'edit' ? !isEditing : false);
    setIsDeleting(buttonName === 'delete' ? !isDeleting : false);
    setShowSettings(buttonName === 'settings' ? !showSettings : false);
  };

  const confirmDelete = () => {
    handleDelete();
  };

  const handleErrorClick = () => {
    setIsLocalError('');
    handleErrorClose();
  };

  const handleSubmitClick = () => {
    if (editText.toLowerCase() === value.toLowerCase()) {
      return setIsLocalError(ERROR_SAME_VALUE);
    }

    setIsLocalError(false);
    setIsChecksumError(false);

    if (allowRsk && editText.endsWith('.rsk')) {
      return handleSubmit(editText);
    }

    if (!validation) {
      return handleSubmit(editText);
    }

    switch (validateAddress(editText, validationChainId)) {
      case 'Invalid address':
        return setIsLocalError('Invalid address');
      case 'Invalid checksum':
        return setIsChecksumError(true);
      default:
    }
    return handleSubmit(editText);
  };

  const handleTextChange = (evt) => {
    setEditText(evt.target.value);
  };

  const handleChecksumClick = () => {
    setEditText(editText.toLowerCase());
    setIsChecksumError(false);
    return handleSubmit(editText);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setIsChecksumError(false);
  };

  const formatValue = () => {
    if (value === '') {
      return value;
    }

    return validation ? toChecksumAddress(value, validationChainId) : value;
  };

  const filtersuggestions = () => suggestions.filter(
    item => item.value.toLowerCase() !== value.toLowerCase(),
  );

  if (isSuccess && (isEditing || isDeleting)) {
    setIsEditing(false);
    setIsDeleting(false);
    setEditText('');
  }

  const buttonProps = {
    disabled: isWaiting,
    onClick: handleButtonClick,
  };

  return (
    <div className="row addressInput">
      <div className="row view">
        <div className="col-md-3 label">
          {labelIcon && <img src={labelIcon} alt={labelDisplay || label} className="filter-primary" />}
          {labelDisplay || label}
        </div>
        <div className={`${allowDelete ? 'col-md-7' : 'col-md-8'} value`}>
          {strings.value_prefix
            && <span className="value-prefix">{`${strings.value_prefix}: `}</span>
          }
          {formatValue()}
        </div>
        <div className={`${allowDelete || settingsMenu ? 'col-md-2' : 'col-md-1'} options`}>
          {settingsMenu && (
            <button {...buttonProps} type="button" className="settings">
              <img src={settings} alt={strings.settings} className="filter-primary" />
            </button>
          )}
          <button {...buttonProps} type="button" className="edit">
            <img src={(!isEditing ? edit : editActive)} alt={strings.edit} className="filter-primary" />
          </button>
          {allowDelete
            && (
            <button {...buttonProps} type="button" className="delete">
              <img src={closeBlue} alt={strings.delete} className="filter-primary" />
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
          {(suggestions && filtersuggestions().length !== 0) && (
          <div className="col-md-8 offset-md-2">
            <ul className="suggestions">
              <li className="title">
                {strings.suggestion}
                :
              </li>
              {filtersuggestions().map(item => (
                <li key={item.value}>
                  <button
                    type="button"
                    onClick={() => setEditText(item.value)}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          )}
        </div>
        )
      }

      <ChecksumErrorComponent
        show={isChecksumError}
        inputValue={editText}
        handleClick={() => handleChecksumClick()}
      />

      {isDeleting
        && (
          <div className="delete">
            <p>{strings.delete_confirm_text}</p>
            <p>
              <Button
                className="cancel"
                onClick={() => { setIsDeleting(false); setIsLocalError(''); }}
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

      {showSettings && <div className="settingsMenu">{settingsMenu}</div>}

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
  allowRsk: false,
  isError: false,
  isWaiting: false,
  isSuccess: false,
  successTx: '',
  validation: true,
  validationChainId: null,
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
    suggestion: '',
  },
  handleDelete: () => {},
  handleErrorClose: () => {},
  handleSuccessClose: () => {},
  labelDisplay: null,
  labelIcon: null,
  suggestions: [],
  settingsMenu: null,
};

AddressInputComponent.propTypes = {
  allowDelete: propTypes.bool,
  allowRsk: propTypes.bool,
  label: propTypes.string.isRequired,
  labelDisplay: propTypes.string,
  labelIcon: propTypes.string,
  isError: propTypes.bool,
  isWaiting: propTypes.bool,
  isSuccess: propTypes.bool,
  validation: propTypes.bool,
  successTx: propTypes.string,
  handleErrorClose: propTypes.func,
  handleSuccessClose: propTypes.func,
  handleSubmit: propTypes.func.isRequired,
  handleDelete: propTypes.func,
  value: propTypes.string.isRequired,
  validationChainId: propTypes.number,
  strings: propTypes.shape(),
  suggestions: propTypes.arrayOf(propTypes.shape({
    name: propTypes.string,
    value: propTypes.value,
  })),
  settingsMenu: propTypes.node,
};

export default AddressInputComponent;
