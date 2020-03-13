import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { useDispatch } from 'react-redux';

import { SubdomainViewContainer } from '../containers';
import { getSubdomainListFromLocalStorage } from '../operations';

const SubdomainListComponent = ({ strings, domain, subdomains }) => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(getSubdomainListFromLocalStorage(domain)), [dispatch]);

  const handleSubmit = (subdomain, address) => {
    console.log('handleSubmit', subdomain, address);
  };

  const handleDelete = (subdomain) => {
    console.log('handleDelete', subdomain, '0x0');
  };

  return (
    <div className="major-section">
      <h3 className="blue">{strings.my_subdomains}</h3>
      {subdomains.map(subdomain => (
        <div className="break-below">
          <SubdomainViewContainer
            key={subdomain.name}
            label={subdomain.name}
            handleSubmit={address => handleSubmit(subdomain.name, address)}
            handleDelete={() => handleDelete(subdomain.name)}
            value={subdomain.owner}
          />
        </div>
      ))}

    </div>
  );
};

SubdomainListComponent.propTypes = {
  strings: propTypes.shape({
    my_subdomains: propTypes.string.isRequired,
  }).isRequired,
  domain: propTypes.string.isRequired,
  subdomains: propTypes.arrayOf({
    name: propTypes.string.isRequired,
    owner: propTypes.string.isRequired,
  }).isRequired,
};

export default multilanguage(SubdomainListComponent);
