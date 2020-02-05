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
      network,
      managerNetwork,
      authenticate,
      authError,
      name,
      isOwner,
      openWallets,
    } = this.props;

    let nameInput;

    const variant = 'rif';

    const { nameInputValue } = this.state;

    let body;

    if (!hasMetamask) {
      body = <Button type="link" onClick={openWallets}>{strings.get_metamask}</Button>;
    } else if (network === 'invalid') {
      body = (
        <div>
          <p><strong>{strings.network_mismatch}</strong></p>
          <p>{`${strings.connect_to_network} ${managerNetwork}`}</p>
        </div>
      );
    } else {
      body = (
        enabling
          ? 'Enabling...'
          : (
            enableError
        || (
        <Form>
          <Form.Group controlId="network">
            <Row>
              <Col lg={2}>
                <Form.Label className={`control-label-${variant}`}>Network</Form.Label>
              </Col>
              <Col lg={10}>
                {network}
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="name">
            <Row>
              <Col lg={2}>
                <Form.Label className={`control-label-${variant}`}>Name</Form.Label>
              </Col>
              <Col lg={10}>
                <Form.Control
                  className={`form-control-${variant}`}
                  type="text"
                  value={nameInputValue}
                  onChange={this.changeInputName}
                />
              </Col>
            </Row>
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
              <Row>
                <Col>
                  <p>{strings.not_domains_owner_message}</p>
                </Col>
              </Row>
            )
          }
        </Form>
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
              <Button onClick={() => authenticate(nameInputValue)}>{strings.log_in}</Button>
            </React.Fragment>
            )
          }
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
  network: propTypes.string.isRequired,
  managerNetwork: propTypes.string.isRequired,
  authenticate: propTypes.func.isRequired,
  authError: propTypes.string,
  name: propTypes.string,
  isOwner: propTypes.bool.isRequired,
  openWallets: propTypes.func.isRequired,
};

AuthModalComponent.defaultProps = {
  defaultName: '',
  enableError: null,
  authError: null,
  name: null,
};

export default multilanguage(AuthModalComponent);
