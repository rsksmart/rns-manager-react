import React, { useState } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Button } from 'react-bootstrap';

import PreviousDomainListComponent from './PreviousDomainListComponent';
import CurrentAccountComponent from './CurrentAccountComponent';
import LoginFormComponent from './LoginFormComponent';

const LoginDropDownComponent = ({
  strings, name, handleLogin, handleLogOut, isOwner, authError, previousDomains,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const isLoggedIn = ((name !== '' && name !== null) && isOwner);

  const handleLoginClick = (domain) => {
    setIsOpen(false);
    handleLogin(domain);
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
          {isLoggedIn && (
            <CurrentAccountComponent
              name={name}
              handleLogOut={handleLogOut}
            />
          )}

          <PreviousDomainListComponent
            previousDomains={previousDomains}
            switchLoginClick={handleLoginClick}
          />

          <LoginFormComponent
            authError={authError}
            handleLogin={handleLoginClick}
          />
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
  isOwner: propTypes.bool.isRequired,
  authError: propTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  previousDomains: propTypes.array.isRequired,
};

export default multilanguage(LoginDropDownComponent);
