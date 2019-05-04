import { HeaderComponent } from '../components';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isOwner,
  viewMyCrypto: state.user.viewMyCrypto,
  domain: state.auth.name
});

export default connect(mapStateToProps)(HeaderComponent);
