import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import { txDisplay } from '../selectors';

class NotificationComponent extends Component {
  render () {
    const { viewNotification, notification } = this.props;

    const display = txDisplay(notification.params);

    return (
      <Alert variant='secondary' dismissible={this.props.dismissible} onClose={viewNotification}>
        {display}
        <p>{notification.tx}</p>
        <p>{notification.mined ? 'Confirmed' : 'Waiting for confirmation...'}</p>
      </Alert>
    )
  }
}

export default NotificationComponent;
