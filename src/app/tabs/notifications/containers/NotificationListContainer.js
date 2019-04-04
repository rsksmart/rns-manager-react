import { NotificationListComponent } from '../components';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  notifications: state.notifications
});

export default connect(mapStateToProps)(NotificationListComponent);
