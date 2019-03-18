import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

class ErrorStackComponent extends Component {
  closeAlert (errorId) {
    const { removeError } = this.props;
    removeError(errorId);
  }

  render () {
    const { errors } = this.props;

    return errors.map(error => (
      <Alert key={error.id} dismissible variant='danger' onClose={() => this.closeAlert(error.id)}>
        {error.message}
      </Alert>
      )
    )
  }
}

export default ErrorStackComponent;
