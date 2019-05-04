import React, { Component } from 'react'
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { TabWithSearchComponent } from '../../../components';
import { MetamaskFormContainer } from '../../../containers';
import { MyCryptoModal } from './MyCryptoModal';
import { multilanguage } from 'redux-multilanguage';

class UnsealComponent extends Component {
  constructor (props) {
    super(props);

    this.state = {
      value: 1,
      salt: '',
      showMyCrypto: false
    };

    this.changeValue = this.changeValue.bind(this);
    this.changeSalt = this.changeSalt.bind(this);
    this.changeShowMyCrypto = this.changeShowMyCrypto.bind(this);
  }

  changeValue (event) {
    this.setState({ value: event.target.value });
  }

  changeSalt (event) {
    this.setState({ salt: event.target.value });
  }

  changeShowMyCrypto () {
    this.setState(state => ({ showMyCrypto: !state.showMyCrypto }));
  }

  render () {
    const { strings, domain, unseal, loading, viewMyCrypto } = this.props;
    const { value, salt, showMyCrypto } = this.state;

    let valueInput, saltInput;

    return (
      <TabWithSearchComponent>
        <h2>{strings.unseal_bid_for} <b>{domain}</b></h2>
        <Button variant='disabled' size='sm' disabled>{strings.upload_bid_data}</Button>
        <MetamaskFormContainer onSubmit={() => unseal(domain, valueInput.value, saltInput.value)}>
          <Form.Group>
            <Form.Label>{strings.value}</Form.Label>
            <InputGroup className="mb-3">
              <FormControl type='number' value={value} onChange={this.changeValue} />
              <InputGroup.Append>
                <InputGroup.Text>RIF</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label>{strings.secret_phrase}</Form.Label>
            <FormControl type='text' salt={salt} onChange={this.changeSalt} />
          </Form.Group>
          {
            viewMyCrypto ?
            <Button onClick={this.changeShowMyCrypto}>{strings.unseal_bid}</Button> :
            <Button type='submit'>{strings.unseal_bid}</Button>
          }
        </MetamaskFormContainer>
        {viewMyCrypto && <MyCryptoModal showMyCrypto={showMyCrypto} changeShowMyCrypto={this.changeShowMyCrypto} name={domain} salt={salt} value={value} />}
        {loading && '...'}
      </TabWithSearchComponent>
    )
  }
}

export default multilanguage(UnsealComponent);
