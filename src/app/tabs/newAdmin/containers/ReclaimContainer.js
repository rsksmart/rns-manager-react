import { connect } from 'react-redux';
import { ReclaimComponent } from '../components';
import { reclaimDomain } from '../domainInfo/operations';
import { closeSetDomainOwner } from '../domainInfo/actions';

const mapStateToProps = state => ({
  domain: state.auth.name,
  checkingRegistryOwner: state.newAdmin.view.checkingRegistryOwner,
  isError: state.newAdmin.domainInfo.registryOwnerError !== '',
  errorMessage: state.newAdmin.domainInfo.registryOwnerError,
  isSettingRegistryOwner: state.newAdmin.domainInfo.isSettingRegistryOwner,
  advancedView: state.newAdmin.view.advancedView,
});

const mapDispatchToProps = dispatch => ({
  reclaimDomain: domain => dispatch(reclaimDomain(domain)),
  handleCloseClick: () => dispatch(closeSetDomainOwner()),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  reclaimDomain: () => dispatchProps.reclaimDomain(stateProps.domain),
  handleCloseClick: () => dispatchProps.handleCloseClick(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ReclaimComponent);
