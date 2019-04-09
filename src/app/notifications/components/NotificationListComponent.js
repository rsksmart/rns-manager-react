import React, { Component } from 'react';
import { TxNotificationComponent } from './index';
import { Container } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { notificationTypes } from '../types';

class NotificationListComponent extends Component {
  render () {
    const { notifications, viewNotification } = this.props;

    return (
      <Container>
        {notifications.map(n => {
          if (n.type === notificationTypes.ERROR) {
            return (
              <Alert key={n.id} variant='danger' dismissible>
                {n.message}
              </Alert>
            )
          }
          else if (n.type === notificationTypes.TX) {
            return (
              <TxNotificationComponent key={n.id} notification={n} dismissible={true} viewNotification={() => viewNotification(n.id)} />
            )
          }
          }
        )}
      </Container>
    )
  }
}

export default NotificationListComponent;
