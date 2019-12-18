import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Form, InputGroup, FormControl, Button, Col,
} from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';
import { isValidDomain } from '../../../validations';

class ResolverAddressComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isValid: true,
    };

    this.validate = this.validate.bind(this);
  }

  validate(name) {
    const isValid = isValidDomain(name);
    this.setState({ isValid });
    return isValid;
  }

  render() {
    const { strings, onResolve } = this.props;
    const { isValid } = this.state;

    let input;

    return (
      <Col lg={12}>
        <Form onSubmit={(e) => {
          e.preventDefault();
          if (this.validate(input.value)) onResolve(input.value);
        }}
        >
          <InputGroup className="mb-3">
            <FormControl
              ref={(node) => {
                input = node;
              }}
              className={!isValid ? 'is-invalid' : null}
            />
            <div className="invalid-feedback">
              {strings.invalid_name}
            </div>
          </InputGroup>
          <Col className="text-center">
            <Button type="submit" variant="primary-rif" className="btn-primary">{strings.resolve}</Button>
          </Col>
        </Form>
      </Col>
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
