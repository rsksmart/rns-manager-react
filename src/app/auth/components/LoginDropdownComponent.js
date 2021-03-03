import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Button } from 'react-bootstrap';

import { LoginFormContainer } from '../containers';
import SingleDomainComponent from './SingleDomainComponent';

const LoginDropDownComponent = ({
  strings, name, handleLogin, isOwner, authError, previousDomains,
  showPopUp, toggleShowPopUp, handleDisconnect, redirectAdmin,
}) => {
  const isLoggedIn = ((name !== '' && name !== null) && isOwner);

  const handleDisconnectClick = domain => handleDisconnect(domain);
  const handleLoginClick = domain => handleLogin(domain);

  return (
    <div className="loginDropdown nav-item">
      <Button
        className="start"
        onClick={toggleShowPopUp}
      >
        {isLoggedIn ? name : strings.login}
      </Button>

      {showPopUp
      && (
        <ul className="popup">
          {isLoggedIn && (
            <SingleDomainComponent
              domain={name}
              handleDisconnectClick={handleDisconnectClick}
              handleTextClick={redirectAdmin}
              isCurrent
            />
          )}

          {previousDomains.map(addr => (
            <SingleDomainComponent
              domain={addr.domain}
              handleDisconnectClick={handleDisconnectClick}
              handleTextClick={handleLoginClick}
            />
          ))}

          <LoginFormContainer
            authError={authError}
            handleLogin={handleLoginClick}
            showLoginInitState={(!isLoggedIn && previousDomains.length === 0) || authError}
          />

          <li>
            <button type="button" onClick={handleDisconnect}>
              {strings.disconnect_wallet}
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

LoginDropDownComponent.defaultProps = {
  name: null,
};

LoginDropDownComponent.propTypes = {
  strings: propTypes.shape({
    login: propTypes.string.isRequired,
    your_domain: propTypes.string.isRequired,
    enter: propTypes.string.isRequired,
    disconnect_wallet: propTypes.string.isRequired,
    not_domains_owner_message: propTypes.string.isRequired,
  }).isRequired,
  name: propTypes.string,
  handleLogin: propTypes.func.isRequired,
  isOwner: propTypes.bool.isRequired,
  authError: propTypes.bool.isRequired,
  showPopUp: propTypes.bool.isRequired,
  toggleShowPopUp: propTypes.func.isRequired,
  previousDomains: propTypes.arrayOf(propTypes.shape({
    domain: propTypes.string,
    owner: propTypes.string,
  })).isRequired,
  handleDisconnect: propTypes.func.isRequired,
  redirectAdmin: propTypes.func.isRequired,
};

export default multilanguage(LoginDropDownComponent);
