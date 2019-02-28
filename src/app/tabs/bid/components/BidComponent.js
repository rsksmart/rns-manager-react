import React, { Component } from 'react';
import { Form, InputGroup, FormControl, Button, Alert } from 'react-bootstrap';

class Bid extends Component {
  render () {
    const { domain, bid, loading, response } = this.props;

    let input;

    return(
      <React.Fragment>
        <h2>Bid for {domain}</h2>
        <Form onSubmit={e => {
          e.preventDefault();
          bid(domain, input.value);
        }}>
          <InputGroup className="mb-3">
            <FormControl ref={node => (input = node)} type='number' />
            <InputGroup.Append>
              <InputGroup.Text>RIF</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
          <Button type='submit'>Bid</Button>
        </Form>
        {loading && '...'}
        {response &&
          <Alert key='startAuction' variant={response.variant}>
            {response.message}<br />
            {response.variant === 'success' && 'Wait until unseal period.'}
          </Alert>
        }
      </React.Fragment>
    )
  }
}

export default Bid;
