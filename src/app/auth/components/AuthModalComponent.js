import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Modal, Row, Col, Form, Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { multilanguage } from 'redux-multilanguage';

class AuthModalComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { nameInputValue: props.defaultName || props.storageName };

    this.changeInputName = this.changeInputName.bind(this);
  }

  changeInputName(event) {
    this.setState({ nameInputValue: event.target.value });
  }

  render() {
    const {
      strings,
      show,
      close,
      hasMetamask,
      enabling,
      enableError,
      displayAddress,
      network,
      authenticate,
      authError,
      name,
      isOwner,
      openWallets,
      switchToMyCrypto,
    } = this.props;

    let nameInput;

    const { nameInputValue } = this.state;

    let body;

    if (!hasMetamask) {
      body = <Button type="link" onClick={openWallets}>{strings.get_metamask}</Button>;
    } else {
      body = (
        enabling
          ? 'Enabling...'
          : (
            enableError
        || (
        <React.Fragment>
          <Form.Group as={Row} controlId="address">
            <Form.Label column sm="2">
              {strings.address}
            </Form.Label>
            <Col sm="10">
              <Form.Control plaintext readOnly defaultValue={displayAddress} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="network">
            <Form.Label column sm="2">
              {strings.network}
            </Form.Label>
            <Col sm="10">
              <Form.Control plaintext readOnly defaultValue={network} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              {strings.name}
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" value={nameInputValue} onChange={this.changeInputName} />
            </Col>
          </Form.Group>
          {
            authError
            && (
            <Form.Group as={Row}>
              <Form.Label column sm="12">
                {authError}
              </Form.Label>
            </Form.Group>
            )
          }
          {
            (name && !isOwner)
            && (
            <Form.Group as={Row}>
              <Form.Label column sm="12">
                {strings.not_domains_owner}
                {' '}
                <Link onClick={close} to={`/search?domain=${name}`}>{strings.get_the_domain}</Link>
              </Form.Label>
            </Form.Group>
            )
          }
        </React.Fragment>
        ))
      );
    }

    return (
      <Modal show={show} onEntered={() => nameInput && nameInput.focus()} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>{strings.log_in}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {body}
        </Modal.Body>
        <Modal.Footer>
          {
            hasMetamask && !enabling && !enableError
              && (
              <React.Fragment>
                <Link onClick={close} to={nameInputValue ? `/search?domain=${nameInputValue}` : '/search'} className="btn btn-primary">{strings.register}</Link>
                <Button onClick={() => authenticate(nameInputValue)} variant="secondary">{strings.log_in}</Button>
              </React.Fragment>
              )
          }
          <Button onClick={switchToMyCrypto} variant="light">{strings.switch_to_mycrypto}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

AuthModalComponent.propTypes = {
  defaultName: propTypes.string,
  storageName: propTypes.string.isRequired,
  strings: propTypes.objectOf(propTypes.string).isRequired,
  show: propTypes.bool.isRequired,
  close: propTypes.func.isRequired,
  hasMetamask: propTypes.bool.isRequired,
  enabling: propTypes.bool.isRequired,
  enableError: propTypes.string,
  displayAddress: propTypes.string,
  network: propTypes.string.isRequired,
  authenticate: propTypes.func.isRequired,
  authError: propTypes.string,
  name: propTypes.string,
  isOwner: propTypes.bool.isRequired,
  openWallets: propTypes.func.isRequired,
  switchToMyCrypto: propTypes.func.isRequired,
};

AuthModalComponent.defaultProps = {
  defaultName: '',
  enableError: null,
  displayAddress: null,
  authError: null,
  name: null,
};

export default multilanguage(AuthModalComponent);
