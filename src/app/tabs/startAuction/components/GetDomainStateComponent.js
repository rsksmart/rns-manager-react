import React, { Component } from 'react';
import { Form, InputGroup, Button, FormControl } from 'react-bootstrap';

class GetDomainStateComponent extends Component {
  render() {
    const { domain, getDomainState } = this.props;

    let input;

    return(
      <Form onSubmit={e => {
        e.preventDefault();
        getDomainState(input.value);
      }}>
        <InputGroup className="mb-3">
          <FormControl ref={node => (input = node)} defaultValue={domain} />
          <InputGroup.Append>
            <Button type="submit">Search</Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    );
  }
}

export default GetDomainStateComponent;
