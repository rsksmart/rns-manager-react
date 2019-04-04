import React, { Component } from 'react';
import { NotificationComponent } from '../../../notifications';
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
        {notifications.map(n => {
          const n_variant = variant(n.type)
          return (
            <Alert key={n.id} variant={n_variant}>
              <NotificationComponent type={n.type} message={n.message} tx={n.tx} mined={n.mined} />
            </Alert>
          )
          }
        )}
      </Container>
    )
  }
}

export default NotificationListComponent;
