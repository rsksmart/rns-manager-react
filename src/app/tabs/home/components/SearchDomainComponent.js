import React, { Component } from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';

class SearchDomainComponent extends Component {
  render () {
    const { onSearch } = this.props;

    let input;

    return (
      <div>
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
      </div>
    )
  }
}

export default SearchDomainComponent;
