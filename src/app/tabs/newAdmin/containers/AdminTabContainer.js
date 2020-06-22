import { connect } from 'react-redux';
import { AdminTabComponent } from '../components';
import { toggleBasicAdvancedSwitch, start } from '../operations';

const mapStateToProps = state => ({
  advancedView: state.newAdmin.view.advancedView,
  isRegistryOwner: state.newAdmin.view.isRegistryOwner,
  domain: state.auth.name,
  enabling: state.auth.enabling,
  isExpired: (state.newAdmin.domainInfo.expires <= 0),
});

const mapDispatchToProps = dispatch => ({
  toggleAdvancedBasic: value => dispatch(toggleBasicAdvancedSwitch(value)),
  start: domain => dispatch(start(domain)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  start: () => dispatchProps.start(stateProps.domain),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(AdminTabComponent);
