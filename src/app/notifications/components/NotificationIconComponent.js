import React, { Component } from 'react';
import { Badge } from 'react-bootstrap';

class NotificationIconComponent extends Component {
  render () {
    const { notifications } = this.props;

    return (
      <React.Fragment>
        notifications {notifications > 0 && <Badge variant="warning">{notifications}</Badge>}
				<span className="sr-only">unread notifications</span>
      </React.Fragment>
    )
  }
}

export default NotificationIconComponent;
