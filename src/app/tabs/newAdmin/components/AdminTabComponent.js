import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { useDispatch } from 'react-redux';

import { start } from '../operations';
import { ToggleContainer } from '../../../containers';

const AdminComponent = (props) => {
  const { strings, toggleAdvancedBasic } = props;

  const dispatch = useDispatch();
  useEffect(() => dispatch(start()), [dispatch]);

  return (
    <div className="admin">
      <ToggleContainer
        labelLeft={strings.basic}
        labelRight={strings.advanced}
        initialValue={false}
        onChange={toggleAdvancedBasic}
      />

      {`New ${strings.admin}`}
    </div>
  );
};

AdminComponent.propTypes = {
  strings: propTypes.shape({
    admin: propTypes.string.isRequired,
    advanced: propTypes.string.isRequired,
    basic: propTypes.string.isRequired,
  }).isRequired,
  toggleAdvancedBasic: propTypes.func.isRequired,
};

export default multilanguage(AdminComponent);
