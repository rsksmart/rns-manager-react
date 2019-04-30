import React, { Component } from 'react'
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { TabWithSearchComponent } from '../../../components';
import { MetamaskFormContainer } from '../../../containers';
import { MyCryptoModal } from './MyCryptoModal';

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
    const { domain, unseal, loading, viewMyCrypto } = this.props;
    const { value, salt, showMyCrypto } = this.state;

    let valueInput, saltInput;

    return (
      <TabWithSearchComponent>
        <h2>unseal your bid for <b>{domain}</b></h2>
        <Button variant='disabled' size='sm' disabled>upload bid</Button>
        <MetamaskFormContainer onSubmit={() => unseal(domain, valueInput.value, saltInput.value)}>
          <Form.Group>
            <Form.Label>value</Form.Label>
            <InputGroup className="mb-3">
              <FormControl type='number' value={value} onChange={this.changeValue} />
              <InputGroup.Append>
                <InputGroup.Text>RIF</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label>secret phrase</Form.Label>
            <FormControl type='text' salt={salt} onChange={this.changeSalt} />
          </Form.Group>
          {
            viewMyCrypto ?
            <Button onClick={this.changeShowMyCrypto}>unseal</Button> :
            <Button type='submit'>unseal</Button>
          }
        </MetamaskFormContainer>
        {viewMyCrypto && <MyCryptoModal showMyCrypto={showMyCrypto} changeShowMyCrypto={this.changeShowMyCrypto} name={domain} salt={salt} value={value} />}
        {loading && '...'}
      </TabWithSearchComponent>
    )
  }
}

export default UnsealComponent;
