import React from 'react';
// import propTypes from 'prop-types';
// import { multilanguage } from 'redux-multilanguage';

import { NewSubdomainContainer, SubdomainListContainer } from '../containers';

const SubdomainsComponent = () => (
  <div className="subdomains">
    <NewSubdomainContainer />
    <SubdomainListContainer />
  </div>
);

/*
SubdomainsComponent.propTypes = {
  strings: propTypes.shape({
  }).isRequired,
};
*/

export default SubdomainsComponent;
// export default multilanguage(SubdomainsComponent);
