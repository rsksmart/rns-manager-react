import React from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';

const SettingsComponent = ({
  strings, login,
}) => (
  <div>
    <p>{strings.subomain_login}</p>
    <button type="button" onClick={login}>{strings.login}</button>
  </div>
);

SettingsComponent.propTypes = {
  login: propTypes.func.isRequired,
  strings: {
    login: propTypes.string.isRequired,
    subomain_login: propTypes.string.isRequired,
  }.isRequired,
};

export default multilanguage(SettingsComponent);
