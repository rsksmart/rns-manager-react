import { connect } from 'react-redux';
import { AdminTabComponent } from '../components';
import { toggleBasicAdvancedSwitch } from '../operations';

// eslint-disable-next-line no-unused-vars
const mapStateToProps = state => ({
  advancedView: state.newAdmin.advancedView,
  loadingAdmin: state.newAdmin.loadingAdmin,
  location: state.router.location.pathname,
});

const mapDispatchToProps = dispatch => ({
  toggleAdvancedBasic: value => dispatch(toggleBasicAdvancedSwitch(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminTabComponent);
