import React from 'react';
import { connect } from 'react-redux';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { push } from 'connected-react-router';

const mapDispatchToProps = dispatch => ({
  onSearch: (domain) => dispatch(push(domain))
});

const SearchDomainContainer = ({
  onSearch
}) => {
  let input;

  return (
    <Form onSubmit={e => {
      e.preventDefault();
      onSearch(`/search?domain=${input.value}`);
    }}>
      <InputGroup>
        <FormControl ref={node => (input = node)} />
        <InputGroup.Append>
          <Button type="submit">Search</Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
}

export default connect(
  null,
  mapDispatchToProps
)(SearchDomainContainer);
