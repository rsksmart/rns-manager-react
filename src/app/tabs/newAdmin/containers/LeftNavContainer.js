import { connect } from 'react-redux';
import { LeftNavComponent } from '../components';
import { logoutManager } from '../../../auth/operations';

const mapStateToProps = state => ({
  advancedView: state.newAdmin.view.advancedView,
  location: state.router.location.pathname,
  domain: state.auth.name,
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logoutManager()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LeftNavComponent);
