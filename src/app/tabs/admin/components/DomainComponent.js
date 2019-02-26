import React, { Component } from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';

class DomainComponent extends Component {
  render () {
    const { onDomainAdmin } = this.props;

    let input;

    return (
      <Form onSubmit={e => {
        e.preventDefault();
        onDomainAdmin(input.value);
      }}>
        <InputGroup className="mb-3">
          <FormControl ref={node => (input = node)} />
          <InputGroup.Append>
            <Button type="submit">Admin</Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    )
  }
}

export default DomainComponent;
