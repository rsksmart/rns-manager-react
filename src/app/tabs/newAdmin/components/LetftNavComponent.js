import React from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

const LeftNavComponent = (props) => {
  const {
    strings, advancedView, location, logOut,
  } = props;

  const isHome = location === '/newAdmin'
    || (!advancedView && (location === '/newAdmin/resolver' || location === '/newAdmin/reverse'));

  return (
    <ul>
      <li>
        <Link
          to="/newAdmin"
          className={isHome ? 'active' : ''}
        >
          {strings.domain_info}
        </Link>
      </li>
      <li>
        <Link
          to="/newAdmin/addresses"
          className={location === '/newAdmin/addresses' ? 'active' : ''}
        >
          {strings.your_addresses}
        </Link>
      </li>
      <li>
        <Link
          to="/newAdmin/subdomains"
          className={location === '/newAdmin/subdomains' ? 'active' : ''}
        >
          {strings.subdomains}
        </Link>
      </li>
      {advancedView
        && (
        <>
          <li>
            <Link
              to="/newAdmin/resolver"
              className={location === '/newAdmin/resolver' ? 'active' : ''}
            >
              {strings.resolver}
            </Link>
          </li>
          <li>
            <Link
              to="/newAdmin/reverse"
              className={location === '/newAdmin/reverse' ? 'active' : ''}
            >
              Reverse
            </Link>
          </li>
        </>
        )
      }
      <li>
        <button type="button" onClick={logOut}>
          {strings.log_out}
        </button>
      </li>
    </ul>
  );
};

LeftNavComponent.propTypes = {
  strings: propTypes.shape({
    admin: propTypes.string.isRequired,
    advanced: propTypes.string.isRequired,
    basic: propTypes.string.isRequired,
    domain_info: propTypes.string.isRequired,
    resolver: propTypes.string.isRequired,
    subdomains: propTypes.string.isRequired,
    your_addresses: propTypes.string.isRequired,
    log_out: propTypes.string.isRequired,
  }).isRequired,
  location: propTypes.string.isRequired,
  advancedView: propTypes.bool.isRequired,
  logOut: propTypes.func.isRequired,
};

export default multilanguage(LeftNavComponent);
