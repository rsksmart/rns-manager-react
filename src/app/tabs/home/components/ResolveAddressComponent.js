import React, { Component } from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { isValidName } from '../../../selectors';

class ResolverAddressComponent extends Component {
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

  render () {
    const { onResolve } = this.props;

    let input;

    return (
      <Form onSubmit={e => {
        e.preventDefault();
        if (this.validate(input.value)) onResolve(input.value);
      }}>
        <InputGroup>
          <FormControl ref={node => (input = node)} className={!this.state.isValid ? 'is-invalid' : null} />
          <InputGroup.Append>
            <Button type="submit" size='sm'>Resolve</Button>
          </InputGroup.Append>
          <div className='invalid-feedback'>
            Invalid name.
          </div>
        </InputGroup>
      </Form>
    );
  }
}

export default ResolverAddressComponent;
