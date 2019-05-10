import React, { Component } from 'react';
import { Alert, Badge } from 'react-bootstrap';
import { txDisplay } from '../selectors';
import { multilanguage } from 'redux-multilanguage';

class NotificationComponent extends Component {
  getTxDisplay (params) {
    const { strings } = this.props;
    return txDisplay(strings)(params);
  }

  render () {
    const { strings, viewNotification, notification } = this.props;

    const display = this.getTxDisplay(notification.params);

    return (
      <Alert variant='light' dismissible={this.props.dismissible} onClose={viewNotification}>
        <code>{notification.params.name}</code>
        <Alert.Heading>{display.title}</Alert.Heading>
        <p>
          <Alert.Link href={`https://explorer.rsk.co/tx/${notification.tx}`} target='_blank'>{notification.tx}</Alert.Link><br />
          {notification.mined ? <Badge variant='success'>{strings.Confirmed}</Badge> : <Badge variant='warning'>{strings.Waiting_for_confirmation_}</Badge>}
        </p>
        {
          notification.mined && display.description &&
          <React.Fragment>
            <hr />
            {display.description}
          </React.Fragment>
        }
        {
          notification.mined && display.action &&
          <React.Fragment>
            <hr />
            {display.action}
          </React.Fragment>
        }
        {notification.mined && display.value && display.value}
      </Alert>
    )
  }
}

export default multilanguage(NotificationComponent);
