import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Form, InputGroup, Button, FormControl,
} from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';
import { isValidName } from '../validations';

class GetDomainStateComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invalid: null,
    };

    this.validate = this.validate.bind(this);
  }

  validate(name) {
    const invalid = isValidName(name);
    this.setState({ invalid });
    return invalid;
  }

  render() {
    const {
      strings, domain, getDomainState, disableSearchButton,
    } = this.props;

    const { invalid } = this.state;

    let input;

    return (
      <Form onSubmit={(e) => {
        e.preventDefault();
        if (!this.validate(input.value)) getDomainState(input.value);
      }}
      >
        <Form.Group>
          <InputGroup className="mb-3">
            <FormControl
              type="text"
              ref={(node) => {
                input = node;
              }}
              defaultValue={domain}
              className={invalid ? 'is-invalid' : null}
            />
            <InputGroup.Append>
              <Button type="submit" size="sm" disabled={disableSearchButton}>{strings.search}</Button>
            </InputGroup.Append>
            <div className="invalid-feedback">
              {invalid}
            </div>
          </InputGroup>
        </Form.Group>
      </Form>
    );
  }
}

GetDomainStateComponent.propTypes = {
  strings: propTypes.shape({
    search: propTypes.string.isRequired,
    invalid_name: propTypes.string.isRequired,
  }).isRequired,
  domain: propTypes.string,
  disableSearchButton: propTypes.bool.isRequired,
  getDomainState: propTypes.func.isRequired,
};

GetDomainStateComponent.defaultProps = {
  domain: '',
};

export default multilanguage(GetDomainStateComponent);
