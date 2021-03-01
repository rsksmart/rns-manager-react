import React from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';

const SettingsComponent = ({
  strings, address, owner, login,
}) => ((address.toLowerCase() !== owner.toLowerCase())
  ? null
  : (
    <div>
      <p>{strings.subomain_login}</p>
      <button type="button" onClick={login}>{strings.login}</button>
    </div>
  ));

SettingsComponent.propTypes = {
  address: propTypes.string.isRequired,
  owner: propTypes.string.isRequired,
  login: propTypes.func.isRequired,
  strings: {
    login: propTypes.string.isRequired,
    subomain_login: propTypes.string.isRequired,
  }.isRequired,
};

export default multilanguage(SettingsComponent);
