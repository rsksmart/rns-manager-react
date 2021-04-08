import React from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

const LeftNavComponent = (props) => {
  const {
    strings, advancedView, location, domain,
  } = props;

  const isHome = location === '/newAdmin'
    || (!advancedView && (location === '/newAdmin/resolver' || location === '/newAdmin/reverse'));

  const ListItemLink = (url, text) => (
    <li>
      <Link to={`/newAdmin/${url}`} className={location === `/newAdmin/${url}` ? 'active' : ''}>{text}</Link>
    </li>
  );

  return (
    <Navbar bg="light" expand="md">
      <Navbar.Brand>{domain}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <ul>
          <li>
            <Link
              to="/newAdmin"
              className={isHome ? 'active' : ''}
            >
              {strings.domain_info}
            </Link>
          </li>

          {ListItemLink('addresses', strings.your_addresses)}
          {ListItemLink('subdomains', strings.subdomains)}
          {ListItemLink('myurl', strings.my_url)}

          {advancedView && (
            <>
              {ListItemLink('resolver', strings.resolver)}
              {ListItemLink('reverse', strings.reverse)}
            </>
          )}
        </ul>
      </Navbar.Collapse>
    </Navbar>
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
    reverse: propTypes.string.isRequired,
    my_url: propTypes.string.isRequired,
  }).isRequired,
  location: propTypes.string.isRequired,
  advancedView: propTypes.bool.isRequired,
  domain: propTypes.string.isRequired,
};

export default multilanguage(LeftNavComponent);
