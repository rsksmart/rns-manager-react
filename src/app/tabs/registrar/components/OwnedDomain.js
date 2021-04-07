import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { StartButtonContainer } from '../../../auth/containers';

const OwnedDomain = ({
  strings, domain, owner, isOwner,
}) => (
  <Container className="page">
    <h2>
      {`${domain}.rsk - `}
      {strings.owned}
    </h2>
    <p>
      <strong>
        {strings.owner}
        {': '}
      </strong>
      {owner}
    </p>
    <p>
      {isOwner && <StartButtonContainer />}
      {!isOwner && <Link to={`/resolve?name=${domain}.rsk`} className="btn btn-primary">{strings.resolve}</Link> }
    </p>
  </Container>
);

OwnedDomain.propTypes = {
  isOwner: propTypes.string.isRequired,
  domain: propTypes.string.isRequired,
  owner: propTypes.string.isRequired,
  strings: propTypes.shape().isRequired,
};

export default multilanguage(OwnedDomain);
