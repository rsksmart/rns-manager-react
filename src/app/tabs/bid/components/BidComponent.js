import React, { Component } from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { TabWithSearchComponent } from '../../../components';

const isValidTokenAmount = token => {
  return token >= 1;
}

class Bid extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isValid: true
    };

    this.validate = this.validate.bind(this);
  }

  validate (tokens) {
    const isValid = isValidTokenAmount(tokens);
    this.setState({ isValid });
    return isValid;
  }

  render () {
    const { domain, bid, loading } = this.props;

    let valueInput, saltInput;

    return(
      <TabWithSearchComponent>
        <h2>Bid for {domain}</h2>
        <Form onSubmit={e => {
          e.preventDefault();
          if (this.validate(valueInput.value)) bid(domain, valueInput.value, saltInput.value);
        }}>
          <Form.Group>
            <Form.Label>Amount to bid</Form.Label>
            <InputGroup className="mb-3">
              <FormControl ref={node => (valueInput = node)} type='number' className={!this.state.isValid ? 'is-invalid' : null} />
              <InputGroup.Append>
                <InputGroup.Text>RIF</InputGroup.Text>
              </InputGroup.Append>
              <div className='invalid-feedback'>
                You must bid at least 1 RIF
              </div>
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label>Salt</Form.Label>
            <FormControl ref={node => (saltInput = node)} type='text' />
          </Form.Group>
          <Button type='submit'>Bid</Button>
        </Form>
        {loading && '...'}
      </TabWithSearchComponent>
    )
  }
}

export default Bid;
