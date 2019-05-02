import React, { Component } from 'react';
import { Form, InputGroup, Button, FormControl } from 'react-bootstrap';
import { isValidName } from '../validations';
import { multilanguage } from 'redux-multilanguage';

class GetDomainStateComponent extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isValid: true
    };

    this.validate = this.validate.bind(this);
  }

  validate (name) {
    const isValid = isValidName(name);
    this.setState({ isValid });
    return isValid;
  }

  render() {
    const { strings, domain, getDomainState } = this.props;

    let input;

    return(
      <Form onSubmit={e => {
        e.preventDefault();
        if (this.validate(input.value)) getDomainState(input.value);
      }}>
        <Form.Group>
          <InputGroup className='mb-3'>
            <FormControl type='text' ref={node => (input = node)} defaultValue={domain} className={!this.state.isValid ? 'is-invalid' : null} />
            <InputGroup.Append>
              <Button type="submit" size='sm'>{strings.search}</Button>
            </InputGroup.Append>
            <div className='invalid-feedback'>
              {strings.invalid_name}
            </div>
          </InputGroup>
        </Form.Group>
      </Form>
    );
  }
}

export default multilanguage(GetDomainStateComponent);
