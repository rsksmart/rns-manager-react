import React, { Component } from 'react';
import { Modal, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class AuthModalComponent extends Component {
  render () {
    const { show, close, hasMetamask, enabling, enableError, displayAddress, network, authenticate, authError, domain, isOwner, defaultDomain } = this.props;

    let input;

    return (
      <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Sign in</Modal.Title>
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
                    authenticate(input.value);
                  }}>
                    <Form.Group as={Row} controlId='address'>
                      <Form.Label column sm='2'>
                        Address
                      </Form.Label>
                      <Col sm='10'>
                        <Form.Control plaintext readOnly defaultValue={displayAddress} />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId='network'>
                      <Form.Label column sm='2'>
                        Network
                      </Form.Label>
                      <Col sm='10'>
                        <Form.Control plaintext readOnly defaultValue={network} />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId='formPlaintextPassword'>
                      <Form.Label column sm='2'>
                        Domain
                      </Form.Label>
                      <Col sm='10'>
                        <Form.Control ref={node => (input = node)} defaultValue={defaultDomain} />
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
                      (domain && !isOwner) &&
                      <Form.Group as={Row}>
                        <Form.Label column sm='12'>
                          You are not the domain's owner. <Link onClick={close} to={`/search?domain=${domain}`}>Get the domain!</Link>
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
