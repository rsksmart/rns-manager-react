import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

class MetamaskButtonComponent extends Component {
  render () {
    const { startAndSubmit, enabled, onSubmit, children, ...props } = this.props;

    return (
      <Form {...props} onSubmit={
        enabled ?
        e => {
          e.preventDefault();
          onSubmit();
        } :
        e => {
          e.preventDefault();
          startAndSubmit();
        }
      }>
        {children}
      </Form>
    );
  }
}

export default MetamaskButtonComponent;
