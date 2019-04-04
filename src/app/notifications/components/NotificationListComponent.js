import React, { Component } from 'react';
import { NotificationComponent } from './index';
import { Container } from 'react-bootstrap';

class NotificationListComponent extends Component {
  render () {
    const { notifications, viewNotification } = this.props;
    return (
      <Container>
        {notifications.map(n =>
          <React.Fragment>
            <NotificationComponent key={n.id} id={n.id} type={n.type} message={n.message} viewNotification={viewNotification} tx={n.tx} mined={n.mined} />
          </React.Fragment>
        )}
      </Container>
    )
  }
}

export default NotificationListComponent;
