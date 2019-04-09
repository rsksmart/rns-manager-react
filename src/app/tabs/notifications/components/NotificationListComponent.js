import React, { Component } from 'react';
import { TxNotificationComponent } from '../../../notifications';
import { Container, Alert } from 'react-bootstrap';
import { notificationTypes } from '../../../notifications';

class NotificationListComponent extends Component {
  render () {
    const { notifications } = this.props;

    const variant = notificationType => {
      if (notificationType === notificationTypes.ERROR) return 'danger';
      if (notificationType === notificationTypes.TX) return 'secondary';
    }

    return (
      <Container>
        {notifications.map(n => <TxNotificationComponent key={n.id} notification={n} dismissible={false} />)}
      </Container>
    )
  }
}

export default NotificationListComponent;
