import React, { Component } from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { TabWithSearchComponent } from '../../../components';

class Bid extends Component {
  render () {
    const { domain, bid, loading } = this.props;

    let input;

    return(
      <TabWithSearchComponent>
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
      </TabWithSearchComponent>
    )
  }
}

export default Bid;
