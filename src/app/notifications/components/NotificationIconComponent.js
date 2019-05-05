import React, { Component } from 'react';
import { Badge } from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';

class NotificationIconComponent extends Component {
  render () {
    const { strings, notifications } = this.props;

    return (
      <React.Fragment>
        {strings.notifications} {notifications > 0 && <Badge variant="warning">{notifications}</Badge>}
				<span className='sr-only'>{strings.unread_notifications}</span>
      </React.Fragment>
    )
  }
}

export default multilanguage(NotificationIconComponent);
