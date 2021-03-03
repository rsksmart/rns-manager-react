import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Button } from 'react-bootstrap';

import { LoginFormContainer } from '../containers';
import SingleDomainComponent from './SingleDomainComponent';

const LoginDropDownComponent = ({
  strings, name, handleLogin, authError, previousDomains, isLoggedIn, isWalletConnected,
  showPopUp, toggleShowPopUp, disconnectDomain, disconnectWallet, redirectAdmin,
}) => {
  let buttonText;
  if (!isWalletConnected) {
    buttonText = 'Connect Wallet';
  } else {
    buttonText = isLoggedIn ? name : strings.login;
  }

  const handleDisconnectClick = domain => disconnectDomain(domain);
  const handleLoginClick = domain => handleLogin(domain);

  return (
    <div className="loginDropdown nav-item">
      <Button className="start" onClick={toggleShowPopUp}>
        {buttonText}
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
              key={addr.domain}
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

          <li className="disconnect">
            <button type="button" onClick={disconnectWallet}>{`- ${strings.disconnect_wallet}`}</button>
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
  authError: propTypes.bool.isRequired,
  showPopUp: propTypes.bool.isRequired,
  toggleShowPopUp: propTypes.func.isRequired,
  previousDomains: propTypes.arrayOf(propTypes.shape({
    domain: propTypes.string,
    owner: propTypes.string,
  })).isRequired,
  disconnectDomain: propTypes.func.isRequired,
  disconnectWallet: propTypes.func.isRequired,
  redirectAdmin: propTypes.func.isRequired,
  isLoggedIn: propTypes.bool.isRequired,
  isWalletConnected: propTypes.bool.isRequired,
};

export default multilanguage(LoginDropDownComponent);
