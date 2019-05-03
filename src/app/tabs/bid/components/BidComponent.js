import React, { Component } from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { TabWithSearchComponent } from '../../../components';
import { MetamaskFormContainer } from '../../../containers';
import { MyCryptoModal } from './MyCryptoModal';
import { multilanguage } from 'redux-multilanguage';

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
    const { strings, domain, bid, loading, viewMyCrypto } = this.props;
    const { showMyCrypto, value, salt } = this.state;

    return(
      <TabWithSearchComponent>
        <h2>{strings.bid_for} <b>{domain}</b></h2>
        <MetamaskFormContainer onSubmit={() => {
          if (this.validate(value)) bid(domain, value, salt);
        }}>
          <Form.Group>
            <Form.Label>{strings.how_much_do_you_value} {domain}?</Form.Label>
            <InputGroup className="mb-3">
              <FormControl value={this.state.value} onChange={this.changeValue} type='number' className={!this.state.isValid ? 'is-invalid' : null} />
              <InputGroup.Append>
                <InputGroup.Text>RIF</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            <div className='invalid-feedback'>
              {strings.bid_error_onw_rif}
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label>{strings.secrete_phrase}</Form.Label>
            <InputGroup className="mb-3">
              <FormControl value={this.state.salt} onChange={this.changeSalt} type='text' />
              <InputGroup.Append>
                <Button size='sm' onClick={this.random}>{strings.random}</Button>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
          <Button variant='link' disabled>{strings.advanced_options}</Button><br />
          {
            viewMyCrypto ?
            <Button type='button' onClick={this.changeShowMyCrypto}>{strings.bid}</Button> :
            <Button type='submit'>{strings.bid}</Button>
          }
        </MetamaskFormContainer>
        {loading && '...'}
        {viewMyCrypto && <MyCryptoModal showMyCrypto={showMyCrypto} changeShowMyCrypto={this.changeShowMyCrypto} name={domain} value={value} salt={salt} />}
      </TabWithSearchComponent>
    )
  }
}

export default multilanguage(Bid);
