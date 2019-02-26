import React, { Component } from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';

class DomainComponent extends Component {
  componentDidMount() {
    const { domain, onDomainAdmin } = this.props;
    onDomainAdmin(domain);
  }

  render () {
    const { domain, onDomainAdmin, onSearch } = this.props;

    let input;

    return (
      <Form onSubmit={e => {
        e.preventDefault();
        onDomainAdmin(input.value);
        onSearch(input.value);
      }}>
        <InputGroup className="mb-3">
          <FormControl ref={node => (input = node)} defaultValue={domain} />
          <InputGroup.Append>
            <Button type="submit">Admin</Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    )
  }
}

export default DomainComponent;
