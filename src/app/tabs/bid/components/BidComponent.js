import React, { Component } from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { TabWithSearchComponent } from '../../../components';
import { MetamaskFormContainer } from '../../../containers';

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
        <h2>bid for <b>{domain}</b></h2>
        <MetamaskFormContainer onSubmit={() => {
          const { value } = valueInput;
          if (this.validate(value)) bid(domain, value, this.state.salt);
        }}>
          <Form.Group>
            <Form.Label>how much do you value {domain}?</Form.Label>
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
            <Form.Label>secret phrase</Form.Label>
            <InputGroup className="mb-3">
              <FormControl value={this.state.salt} onChange={this.changeSalt} type='text' />
              <InputGroup.Append>
                <Button size='sm' onClick={this.random}>Random</Button>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
          <Button variant='link' disabled>advenced options</Button><br />
          <Button type='submit'>Bid</Button>
        </MetamaskFormContainer>
        {loading && '...'}
      </TabWithSearchComponent>
    )
  }
}

export default Bid;
