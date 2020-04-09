import React, { useState } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Button } from 'react-bootstrap';

import PreviousDomainListComponent from './PreviousDomainListComponent';

const LoginDropDownComponent = ({
  strings, name, handleLogin, handleSwitchLogin, handleLogOut, isOwner, authError, previousDomains,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [domainInput, setDomainInput] = useState('');

  const isLoggedIn = ((name !== '' && name !== null) && isOwner);

  const handleLoginClick = () => {
    if (domainInput === '') {
      return;
    }

    const appendRsk = domainInput.endsWith('.rks') ? domainInput : `${domainInput}.rsk`;
    handleLogin(appendRsk);
  };

  const switchLoginClick = (domain) => {
    setIsOpen(false);
    handleSwitchLogin(domain);
  };

  return (
    <div className="loginDropdown nav-item">
      <Button
        className="start"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isLoggedIn ? name : strings.login}
      </Button>
      {isOpen
      && (
        <div className="popup">
          {isLoggedIn
          && (
            <div className="current">
              <button
                type="button"
                className="switchButton"
                onClick={() => switchLoginClick(name)}
              >
                {name}
              </button>
              <Button
                variant="outline-primary"
                onClick={handleLogOut}
              >
                {strings.log_out}
              </Button>
            </div>
          )}

          <PreviousDomainListComponent
            previousDomains={previousDomains}
            switchLoginClick={switchLoginClick}
          />

          <div className="loginForm">
            <h3>{strings.your_domain}</h3>
            <div className="rskinput">
              <input
                value={domainInput}
                onChange={evt => setDomainInput(evt.target.value)}
              />
              <span>.rsk</span>
            </div>
            <Button
              onClick={handleLoginClick}
            >
              {strings.enter}
            </Button>
            {authError && <p className="error">{strings.not_domains_owner_message}</p>}
          </div>
        </div>
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
    log_out: propTypes.string.isRequired,
    not_domains_owner_message: propTypes.string.isRequired,
  }).isRequired,
  name: propTypes.string,
  handleLogin: propTypes.func.isRequired,
  handleLogOut: propTypes.func.isRequired,
  handleSwitchLogin: propTypes.func.isRequired,
  isOwner: propTypes.bool.isRequired,
  authError: propTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  previousDomains: propTypes.array.isRequired,
};

export default multilanguage(LoginDropDownComponent);
