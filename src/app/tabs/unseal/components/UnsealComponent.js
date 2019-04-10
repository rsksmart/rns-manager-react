import React, { Component } from 'react'
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { TabWithSearchComponent } from '../../../components';

class UnsealComponent extends Component {
  render () {
    const { domain, unseal, loading } = this.props;

    let valueInput, saltInput;

    return (
      <TabWithSearchComponent>
        <h2>Unseal bid for {domain}</h2>
        <Form onSubmit={e => {
          e.preventDefault();
          unseal(domain, valueInput.value, saltInput.value);
        }}>
          <Form.Group>
            <InputGroup className="mb-3">
              <FormControl ref={node => (valueInput = node)} type='number' />
              <InputGroup.Append>
                <InputGroup.Text>RIF</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <FormControl ref={node => (saltInput = node)} type='text' />
          </Form.Group>
          <Button type='submit'>Unseal</Button>
        </Form>
        {loading && '...'}
      </TabWithSearchComponent>
    )
  }
}

export default UnsealComponent;
