import { connect } from 'react-redux';
import { HeaderComponent } from '../components';
import { logoutManager } from '../auth/operations';

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isOwner,
  domain: state.auth.name,
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logoutManager()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderComponent);
