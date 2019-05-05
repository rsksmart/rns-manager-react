import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import { txDisplay } from '../selectors';
import { multilanguage } from 'redux-multilanguage';

class NotificationComponent extends Component {
  render () {
    const { strings, viewNotification, notification } = this.props;

    const display = txDisplay(notification.params);

    return (
      <Alert variant='secondary' dismissible={this.props.dismissible} onClose={viewNotification}>
        {display}
        <p>{notification.tx}</p>
        <p>{notification.mined ? strings.Confirmed : strings.Waiting_for_confirmation_}</p>
      </Alert>
    )
  }
}

export default multilanguage(NotificationComponent);
