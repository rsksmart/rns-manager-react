import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Form, InputGroup, FormControl, Button,
} from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';
import { isValidName } from '../../../validations';

class ResolverAddressComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isValid: true,
    };

    this.validate = this.validate.bind(this);
  }

  validate(name) {
    const isValid = isValidName(name);
    this.setState({ isValid });
    return isValid;
  }

  render() {
    const { strings, onResolve } = this.props;
    const { isValid } = this.state;

    let input;

    return (
      <Form onSubmit={(e) => {
        e.preventDefault();
        if (this.validate(input.value)) onResolve(input.value);
      }}
      >
        <InputGroup>
          <FormControl
            ref={(node) => {
              input = node;
            }}
            className={!isValid ? 'is-invalid' : null}
          />
          <InputGroup.Append>
            <Button type="submit" size="sm">{strings.resolve}</Button>
          </InputGroup.Append>
          <div className="invalid-feedback">
            {strings.invalid_name}
          </div>
        </InputGroup>
      </Form>
    );
  }
}

ResolverAddressComponent.propTypes = {
  strings: propTypes.shape({
    resolve: propTypes.string.isRequired,
    invalid_name: propTypes.string.isRequired,
  }).isRequired,
  onResolve: propTypes.func.isRequired,
};

export default multilanguage(ResolverAddressComponent);
