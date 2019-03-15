import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

class ErrorStackComponent extends Component {
  render () {
    const { errors } = this.props;

    return errors.map(error => (
      <Alert key={error.id} variant='danger'>
        {error.message}
      </Alert>
      )
    )
  }
}

export default ErrorStackComponent;
