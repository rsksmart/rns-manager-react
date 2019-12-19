import React, { Component } from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import {
  Spinner, Button, Container, Col, Form, FormControl, InputGroup,
} from 'react-bootstrap';
import { validateAddress } from '../../../validations';

class TransferDomainComponent extends Component {
  constructor(props) {
    super(props);

    const { currentOwner } = this.props;

    this.state = {
      invalid: null,
      addressToTransfer: currentOwner,
    };

    this.validate = this.validate.bind(this);
    this.addressChange = this.addressChange.bind(this);
    this.onTransfer = this.onTransfer.bind(this);
  }

  onTransfer(event) {
    event.preventDefault();
    const { transfer } = this.props;
    const { addressToTransfer } = this.state;
    if (!this.validate()) {
      transfer(addressToTransfer);
    }
  }

  addressChange(event) {
    this.setState({ addressToTransfer: event.target.value });
  }

  validate() {
    const { addressToTransfer } = this.state;
    const invalid = validateAddress(addressToTransfer);
    this.setState({ invalid });
    return invalid;
  }

  render() {
    const {
      checking, transferring, strings, justTransferred,
    } = this.props;

    const { invalid, addressToTransfer } = this.state;

    let html;

    if (checking || transferring) {
      html = <Spinner animation="grow" variant="primary" />;
    } else if (justTransferred) {
      html = strings.already_transferred;
    } else {
      html = (
        <Col lg={12}>
          <Form onSubmit={this.onTransfer}>
            <Col>
              <InputGroup className="mb-3">
                <FormControl type="text" value={addressToTransfer} onChange={this.addressChange} className={invalid && 'is-invalid'} />
                <div className="invalid-feedback">
                  {invalid}
                </div>
              </InputGroup>
            </Col>
            <Col className="text-center">
              <Button type="submit" disabled={transferring} variant="primary-rif">{strings.transfer}</Button>
            </Col>
          </Form>
        </Col>
      );
    }

    return (
      <Container>
        <h3>{strings.transfer_domain}</h3>
        {html}
      </Container>
    );
  }
}

TransferDomainComponent.propTypes = {
  strings: propTypes.shape({
    transfer: propTypes.string.isRequired,
    transfer_domain: propTypes.string.isRequired,
    already_transferred: propTypes.string.isRequired,
  }).isRequired,
  transfer: propTypes.func.isRequired,
  currentOwner: propTypes.string.isRequired,
  checking: propTypes.bool.isRequired,
  transferring: propTypes.bool.isRequired,
  justTransferred: propTypes.bool.isRequired,
};

export default multilanguage(TransferDomainComponent);
