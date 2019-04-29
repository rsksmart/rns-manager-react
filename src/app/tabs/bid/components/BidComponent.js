import React, { Component } from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { TabWithSearchComponent } from '../../../components';
import { MetamaskFormContainer } from '../../../containers';
import { MyCryptoModal } from './MyCryptoModal';

const isValidTokenAmount = token => {
  return token >= 1;
}

class Bid extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isValid: true,
      salt: '',
      value: 1,
      showMyCrypto: false
    };

    this.validate = this.validate.bind(this);
    this.random = this.random.bind(this);
    this.changeSalt = this.changeSalt.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.changeShowMyCrypto = this.changeShowMyCrypto.bind(this);
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

  changeValue (event) {
    this.setState({ value: event.target.value });
  }

  changeShowMyCrypto () {
    this.setState({ showMyCrypto: !this.state.showMyCrypto });
  }

  render () {
    const { domain, bid, loading, viewMyCrypto } = this.props;
    const { showMyCrypto, value, salt } = this.state;

    return(
      <TabWithSearchComponent>
        <h2>bid for <b>{domain}</b></h2>
        <MetamaskFormContainer onSubmit={() => {
          if (this.validate(value)) bid(domain, value, salt);
        }}>
          <Form.Group>
            <Form.Label>how much do you value {domain}?</Form.Label>
            <InputGroup className="mb-3">
              <FormControl value={this.state.value} onChange={this.changeValue} type='number' className={!this.state.isValid ? 'is-invalid' : null} />
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
          {
            viewMyCrypto ?
            <Button type='button' onClick={this.changeShowMyCrypto}>bid</Button> :
            <Button type='submit'>bid</Button>
          }
        </MetamaskFormContainer>
        {loading && '...'}
        {viewMyCrypto && <MyCryptoModal showMyCrypto={showMyCrypto} changeShowMyCrypto={this.changeShowMyCrypto} name={domain} value={value} salt={salt} />}
      </TabWithSearchComponent>
    )
  }
}

export default Bid;
