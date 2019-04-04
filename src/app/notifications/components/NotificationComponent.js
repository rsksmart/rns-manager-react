import React, { Component } from 'react';
import { notificationTypes } from '../types';

class NotificationComponent extends Component {
  render () {
    const { type, message, tx, mined } = this.props;

    return (
      <React.Fragment>
        {message}
        {
          (type === notificationTypes.TX) &&
          <React.Fragment>
            <br />
            {tx}
            <br />
            {mined ? 'Confirmed' : 'Waiting for confirmation...'}
          </React.Fragment>
        }
      </React.Fragment>
    )
  }
}

export default NotificationComponent;
