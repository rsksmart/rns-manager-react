import React, { Component } from 'react';
import { Modal, Button, Form, InputGroup, FormControl, Alert } from 'react-bootstrap';

class AuthModalComponent extends Component {
  render () {
    const { show, handleClose, authenticating, errorAuth, authenticate, address } = this.props;

    let input;

    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Proof domain ownership</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={e => {
            e.preventDefault();
            authenticate(input.value, address);
          }}>
            <InputGroup>
              <FormControl ref={node => (input = node)} />
              <InputGroup.Append>
                <Button type="submit">Log in</Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
          {
            authenticating && '...'
          }
          {
            errorAuth &&
            <Alert variant='danger'>
              {errorAuth}
            </Alert>
          }
        </Modal.Body>
      </Modal>
    )
  }
}

export default AuthModalComponent;
