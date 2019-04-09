import React, { Component } from 'react';
import { TxNotificationComponent } from '../../../notifications';
import { Container } from 'react-bootstrap';

class NotificationListComponent extends Component {
  render () {
    const { notifications } = this.props;

    return (
      <Container>
        {notifications.map(n => <TxNotificationComponent key={n.id} notification={n} dismissible={false} />)}
      </Container>
    )
  }
}

export default NotificationListComponent;
