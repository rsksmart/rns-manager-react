import React, { Component } from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';

class ResolverAddressComponent extends Component {
  render () {
    const { onResolve, resolveAddressLoading, address } = this.props;

    let input;

    return (
      <div>
        <h2>Resolve</h2>
        <Form onSubmit={e => {
          e.preventDefault();
          onResolve(input.value);
        }}>
          <InputGroup>
            <FormControl ref={node => (input = node)} />
            <InputGroup.Append>
              <Button type="submit">Resolve</Button>
            </InputGroup.Append>
          </InputGroup>
          <p>{resolveAddressLoading ? 'Loading...' : address}</p>
        </Form>
      </div>
    );
  }
}

export default ResolverAddressComponent;
