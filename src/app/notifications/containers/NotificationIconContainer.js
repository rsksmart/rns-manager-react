import { NotificationIconComponent } from '../components';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  notifications: state.notifications.filter(n => !n.viewed).length
});

export default connect(mapStateToProps)(NotificationIconComponent);
