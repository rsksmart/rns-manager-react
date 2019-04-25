import React, { Component } from 'react';
import { Modal, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class AuthModalComponent extends Component {
  render () {
    const { show, close, hasMetamask, enabling, enableError, displayAddress, network, authenticate, authError, name, isOwner, defaultName } = this.props;

    let nameInput;

    return (
      <Modal show={show} onEntered={() => nameInput && nameInput.focus()} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>log in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            !hasMetamask ?
            'Get MetaMask' :
            (
              enabling ?
              'Enabling...' :
              (
                enableError ||
                <React.Fragment>
                  <Form onSubmit={e => {
                    e.preventDefault();
                    authenticate(nameInput.value);
                  }}>
                    <Form.Group as={Row} controlId='address'>
                      <Form.Label column sm='2'>
                        address
                      </Form.Label>
                      <Col sm='10'>
                        <Form.Control plaintext readOnly defaultValue={displayAddress} />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId='network'>
                      <Form.Label column sm='2'>
                        network
                      </Form.Label>
                      <Col sm='10'>
                        <Form.Control plaintext readOnly defaultValue={network} />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId='formPlaintextPassword'>
                      <Form.Label column sm='2'>
                        name
                      </Form.Label>
                      <Col sm='10'>
                        <Form.Control type='text' ref={node => (nameInput = node)} defaultValue={defaultName} />
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
                          You are not the name's owner. <Link onClick={close} to={`/search?domain=${name}`}>Get the name!</Link>
                        </Form.Label>
                      </Form.Group>
                    }
                    <Button type='submit'>Log in</Button>
                  </Form>
                </React.Fragment>
              )
            )
          }
        </Modal.Body>
      </Modal>
    )
  }
}

export default AuthModalComponent;
