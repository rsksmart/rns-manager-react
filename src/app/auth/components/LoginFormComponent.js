import React, { useState } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Button } from 'react-bootstrap';

const LoginFormComponent = ({
  strings, authError, handleLogin,
}) => {
  const [domainInput, setDomainInput] = useState('');

  const handleLoginClick = () => {
    if (domainInput === '') {
      return;
    }
console.log(domainInput);
    const appendRsk = domainInput.endsWith('.rks') ? domainInput : `${domainInput}.rsk`;
    handleLogin(appendRsk);
  };

  return (
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
  );
};

LoginFormComponent.propTypes = {
  strings: propTypes.shape({
    not_domains_owner_message: propTypes.string.isRequired,
    enter: propTypes.string.isRequired,
    your_domain: propTypes.string.isRequired,
  }).isRequired,
  authError: propTypes.bool.isRequired,
  handleLogin: propTypes.func.isRequired,
};

export default multilanguage(LoginFormComponent);
