import { connect } from 'react-redux';
import { HeaderComponent } from '../components';

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isOwner,
  viewMyCrypto: state.user.viewMyCrypto,
  domain: state.auth.name,
  network: process.env.REACT_APP_ENVIRONMENT_ID,
});

export default connect(mapStateToProps)(HeaderComponent);
