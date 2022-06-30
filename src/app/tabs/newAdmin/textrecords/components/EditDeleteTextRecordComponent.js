import React, { useState } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import edit from '../../../../../assets/img/edit.svg';
import editActive from '../../../../../assets/img/edit-active.svg';
import closeBlue from '../../../../../assets/img/close-blue.svg';
import closeRed from '../../../../../assets/img/close-red.svg';
import { EditValueForKeyContainer, DeleteValueForKeyContainer } from '../containers';

const EditDeleteTextRecordComponent = ({
  value, strings,
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const [isDeletable, setIsShown] = useState(false);
  const handleEditClicked = () => {
    setIsEditable(current => !current);
  };
  const handleDeleteClicked = () => {
    setIsShown(current => !current);
  };

  React.useEffect(() => {
  });
  return (
    <tr
      key={value.id}
      data-id={value.id}
    >
      <td>{value.id}</td>
      <td>{value.result}</td>
      <td>
        <div
          aria-hidden="true"
          md="3"
          onClick={handleEditClicked}
          onKeyDown={handleEditClicked}
        >
          <img src={(isEditable ? editActive : edit)} alt={strings.edit} />
        </div>
        {isEditable && (
          <EditValueForKeyContainer
            value={value}
          />
        )}
        {!isEditable && ''}
      </td>
      <td>
        <div
          aria-hidden="true"
          md="3"
          onClick={handleDeleteClicked}
          onKeyDown={handleDeleteClicked}
        >
          <img src={(isDeletable ? closeRed : closeBlue)} alt={strings.delete} />
        </div>
        {isDeletable && (
          <DeleteValueForKeyContainer
            value={value}
          />
        )}
        {!isDeletable && ''}
      </td>
    </tr>
  );
};
EditDeleteTextRecordComponent.propTypes = {
  value: propTypes.arrayOf.isRequired,
  strings: propTypes.shape({
    edit: propTypes.string.isRequired,
    delete: propTypes.string.isRequired,
    cancel: propTypes.string.isRequired,
  }).isRequired,
};

export default multilanguage(EditDeleteTextRecordComponent);
