import React, { useState } from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';

import { Form, Row, Button } from 'react-bootstrap';
import { isValidName } from '../../../validations';

const SearchBoxComponent = (
  {
    handleClick, strings, validationMessage, minLength, maxLength,
  },
) => {
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const handleSearchClick = () => {
    setError('');

    if (search === '') {
      return;
    }

    if (isValidName(search.toLowerCase()) !== null) {
      setError(strings.invalid_name);
      return;
    }

    handleClick(search.toLowerCase());
  };

  const handleSearchEnter = (e) => {
    e.preventDefault();
    handleSearchClick();
  };

  return (
    <>
      <Form onSubmit={handleSearchEnter} className="searchBox row">
        <div className="col-md-7 col-lg-7 offset-lg-1 searchInput">
          <input
            placeholder={strings.search_placeholder}
            value={search}
            onChange={evt => setSearch(evt.target.value)}
            autoCapitalize="none"
          />
          <span className="blue">.rsk</span>
        </div>
        <div className="col-md-5 col-lg-3">
          <Button
            onClick={handleSearchClick}
          >
            {strings.search}
          </Button>
        </div>
      </Form>
      {(error || validationMessage)
      && (
        <Row className="errorMessage">
          <div className="col-md-8 offset-md-2">
            {error && (<p>{strings.invalid_name}</p>)}
            { validationMessage && (
            <p>
              { validationMessage === 'default' ? `${strings.domain_length_validation_msg_default} ${minLength} - ${maxLength}`
                : `${strings.domain_length_validation_msg_partner} ${minLength} - ${maxLength}`}
            </p>
            )}
          </div>
        </Row>
      )}
    </>
  );
};

SearchBoxComponent.propTypes = {
  strings: propTypes.shape({
    search_placeholder: propTypes.string.isRequired,
    search: propTypes.string.isRequired,
    blocked_domain: propTypes.string.isRequired,
    invalid_name: propTypes.string.isRequired,
    domain_length_validation_msg_partner: propTypes.string.isRequired,
    domain_length_validation_msg_default: propTypes.string.isRequired,
  }).isRequired,
  validationMessage: propTypes.string.isRequired,
  minLength: propTypes.number.isRequired,
  maxLength: propTypes.number.isRequired,
  handleClick: propTypes.func.isRequired,
};

export default multilanguage(SearchBoxComponent);
