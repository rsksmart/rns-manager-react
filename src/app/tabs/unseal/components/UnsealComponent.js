import React, { Component } from 'react'
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { TabWithSearchComponent } from '../../../components';
import { MetamaskFormContainer } from '../../../containers';

class UnsealComponent extends Component {
  render () {
    const { domain, unseal, loading } = this.props;

    let valueInput, saltInput;

    return (
      <TabWithSearchComponent>
        <h2>unseal your bid for <b>{domain}</b></h2>
        <Button variant='disabled' size='sm' disabled>upload bid</Button>
        <MetamaskFormContainer onSubmit={() => unseal(domain, valueInput.value, saltInput.value)}>
          <Form.Group>
            <Form.Label>value</Form.Label>
            <InputGroup className="mb-3">
              <FormControl ref={node => (valueInput = node)} type='number' />
              <InputGroup.Append>
                <InputGroup.Text>RIF</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label>secret phrase</Form.Label>
            <FormControl ref={node => (saltInput = node)} type='text' />
          </Form.Group>
          <Button type='submit'>Unseal</Button>
        </MetamaskFormContainer>
        {loading && '...'}
      </TabWithSearchComponent>
    )
  }
}

export default UnsealComponent;
