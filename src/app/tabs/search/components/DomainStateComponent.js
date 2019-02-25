import React, { Component } from 'react';
import { Form, InputGroup, Button, FormControl } from 'react-bootstrap';

class DomainStateComponent extends Component {
  componentDidMount() {
    const { domain, getState } = this.props;
    getState(domain);
  }

  render () {
    const { domain, onSearch, getState, auctionState, auctionStateLoading } = this.props;

    let input;

    return (
      <Form onSubmit={e => {
        e.preventDefault();
        onSearch(input.value);
        getState(input.value);
      }}>
        <InputGroup className="mb-3">
          <FormControl ref={node => (input = node)} defaultValue={domain} />
          <InputGroup.Append>
            <Button type="submit">Search</Button>
          </InputGroup.Append>
        </InputGroup>
        <p>{auctionStateLoading ? 'Loading...' : auctionState}</p>
      </Form>
    );
  }
}

export default DomainStateComponent;
