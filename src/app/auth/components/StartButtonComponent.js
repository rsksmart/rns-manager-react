import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';

const StartButtonComponent = (props) => {
  const {
    strings, open, user, isOwner, domain, address, viewMyCrypto,
  } = props;

  if (viewMyCrypto) {
    return (
      <button type="button" className="btn btn-outline-primary my-2 my-sm-0 ml-1" onClick={open}>
        {strings.switch_to_metamask}
      </button>
    );
  }

  if (!address) {
    return (
      <button type="button" className="btn btn-outline-primary my-2 my-sm-0 ml-1" onClick={open}>
        {strings.start}
      </button>
    );
  }

  if (domain && isOwner) {
    return (
      <button type="button" className="btn btn-outline-primary my-2 my-sm-0 ml-1" onClick={user}>{domain}</button>
    );
  }

  return (
    <button type="button" className="btn btn-outline-primary my-2 my-sm-0 ml-1" onClick={open}>{strings.log_in}</button>
  );
};

StartButtonComponent.propTypes = {
  strings: propTypes.shape({
    switch_to_metamask: propTypes.string.isRequired,
    start: propTypes.string.isRequired,
    log_in: propTypes.string.isRequired,
  }).isRequired,
  open: propTypes.func.isRequired,
  user: propTypes.func.isRequired,
  isOwner: propTypes.bool.isRequired,
  domain: propTypes.string.isRequired,
  address: propTypes.string.isRequired,
  viewMyCrypto: propTypes.bool.isRequired,
};

export default multilanguage(StartButtonComponent);
