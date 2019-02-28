import React, { Component } from 'react'
import { Form, InputGroup, FormControl, Button, Alert } from 'react-bootstrap';

class UnsealComponent extends Component {
  render () {
    const { domain, unseal, response, loading } = this.props;

    let input;

    return (
      <React.Fragment>
        <h2>Unseal bid for {domain}</h2>
        <Form onSubmit={e => {
          e.preventDefault();
          unseal(domain, input.value);
        }}>
          <InputGroup className="mb-3">
            <FormControl ref={node => (input = node)} type='number' />
            <InputGroup.Append>
              <InputGroup.Text>RIF</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
          <Button type='submit'>Unseal</Button>
        </Form>
        {loading && '...'}
        {response &&
          <Alert key='startAuction' variant={response.variant}>
            {response.message}<br />
            {response.variant === 'success' && 'Wait until auction finalizes.'}
          </Alert>
        }
      </React.Fragment>
    )
  }
}

export default UnsealComponent;
