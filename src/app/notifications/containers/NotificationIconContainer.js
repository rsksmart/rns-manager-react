import { NotificationIconComponent } from '../components';
import { connect } from 'react-redux';
import { notificationTypes } from '../types';

const mapStateToProps = state => ({
  notifications: state.notifications.filter(n => !n.viewed && n.type === notificationTypes.TX).length
});

export default connect(mapStateToProps)(NotificationIconComponent);
