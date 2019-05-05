import React, { Component } from 'react';
import { Modal, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { multilanguage } from 'redux-multilanguage';

class AuthModalComponent extends Component {
  constructor (props) {
    super(props);

    this.state = { nameInputValue: props.defaultName || props.storageName };

    this.changeInputName = this.changeInputName.bind(this);
  }

  changeInputName (event) {
    this.setState({ nameInputValue: event.target.value });
  }

  render () {
    const { strings, show, close, hasMetamask, enabling, enableError, displayAddress, network, authenticate, authError, name, isOwner, openWallets, switchToMyCrypto } = this.props;

    let nameInput;

    const { nameInputValue } = this.state;

    return (
      <Modal show={show} onEntered={() => nameInput && nameInput.focus()} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>{strings.log_in}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            !hasMetamask ?
            <Button type='link' onClick={openWallets}>{strings.get_metamask}</Button> :
            (
              enabling ?
              'Enabling...' :
              (
                enableError ||
                <React.Fragment>
                  <Form.Group as={Row} controlId='address'>
                    <Form.Label column sm='2'>
                      {strings.address}
                    </Form.Label>
                    <Col sm='10'>
                      <Form.Control plaintext readOnly defaultValue={displayAddress} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId='network'>
                    <Form.Label column sm='2'>
                      {strings.network}
                    </Form.Label>
                    <Col sm='10'>
                      <Form.Control plaintext readOnly defaultValue={network} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId='formPlaintextPassword'>
                    <Form.Label column sm='2'>
                      {strings.name}
                    </Form.Label>
                    <Col sm='10'>
                      <Form.Control type='text' value={nameInputValue} onChange={this.changeInputName} />
                    </Col>
                  </Form.Group>
                  {
                    authError &&
                    <Form.Group as={Row}>
                      <Form.Label column sm='12'>
                        {authError}
                      </Form.Label>
                    </Form.Group>
                  }
                  {
                    (name && !isOwner) &&
                    <Form.Group as={Row}>
                      <Form.Label column sm='12'>
                        {strings.not_domains_owner} <Link onClick={close} to={`/search?domain=${name}`}>{strings.get_the_domain}</Link>
                      </Form.Label>
                    </Form.Group>
                  }
                </React.Fragment>
              )
            )
          }
        </Modal.Body>
        <Modal.Footer>
          {
            hasMetamask && !enabling && !enableError &&
              <React.Fragment>
                <Link onClick={close} to={nameInputValue ? `/search?domain=${nameInputValue}` : '/search'} className='btn btn-primary'>{strings.register}</Link>
                <Button onClick={() => authenticate(nameInputValue)} variant='secondary'>{strings.log_in}</Button>
              </React.Fragment>
          }
          <Button onClick={switchToMyCrypto} variant='light'>{strings.switch_to_mycrypto}</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default multilanguage(AuthModalComponent);
