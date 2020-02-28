import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';

const AdminComponent = (props) => {
  const { strings } = props;

  return (
    <div className="admin">
      {`New ${strings.admin}`}
    </div>
  );
};

AdminComponent.propTypes = {
  strings: propTypes.shape({
    admin: propTypes.string.isRequired,
  }).isRequired,
};

export default multilanguage(AdminComponent);
