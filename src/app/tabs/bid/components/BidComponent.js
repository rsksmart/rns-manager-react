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
      isValid: true,
      salt: ''
    };

    this.validate = this.validate.bind(this);
    this.random = this.random.bind(this);
    this.changeSalt = this.changeSalt.bind(this);
  }

  validate (tokens) {
    const isValid = isValidTokenAmount(tokens);
    this.setState({ isValid });
    return isValid;
  }

  random () {
    var randomBytes = window.crypto.getRandomValues(new Uint8Array(32));
    this.setState({ salt: '0x' + Array.from(randomBytes).map((byte) => byte.toString(16)).join('') });
  }

  changeSalt (event) {
    this.setState({ salt: event.target.value });
  }

  render () {
    const { domain, bid, loading } = this.props;

    let valueInput;

    return(
      <TabWithSearchComponent>
        <h2>Bid for {domain}</h2>
        <Form onSubmit={e => {
          e.preventDefault();
          if (this.validate(valueInput.value)) bid(domain, valueInput.value, this.state.salt);
        }}>
          <Form.Group>
            <Form.Label>Amount to bid</Form.Label>
            <InputGroup className="mb-3">
              <FormControl ref={node => (valueInput = node)} type='number' className={!this.state.isValid ? 'is-invalid' : null} />
              <InputGroup.Append>
                <InputGroup.Text>RIF</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            <div className='invalid-feedback'>
              You must bid at least 1 RIF
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label>Salt</Form.Label>
            <InputGroup className="mb-3">
              <FormControl value={this.state.salt} onChange={this.changeSalt} type='text' />
              <InputGroup.Append>
                <Button size='sm' onClick={this.random}>Random</Button>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
          <Button type='submit'>Bid</Button>
        </Form>
        {loading && '...'}
      </TabWithSearchComponent>
    )
  }
}

export default Bid;
