import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import { notificationTypes } from '../types';

class NotificationComponent extends Component {
  render () {
    const { id, type, message, viewNotification } = this.props;

    var txDisplay;
    var variant;

    if (type === notificationTypes.TX) {
      variant = 'secondary';
      const { tx, mined } = this.props;
      txDisplay = (
        <React.Fragment>
          <br />
          {tx}
          <br />
          {mined ? 'Confirmed' : 'Waiting for confirmation...'}
        </React.Fragment>
      );
    } else if (type ===notificationTypes.ERROR) {
      variant = 'danger'
    }

    return (
      <Alert variant={variant} dismissible onClose={() => viewNotification(id)}>
        {message}
        {txDisplay}
      </Alert>
    )
  }
}

export default NotificationComponent;
