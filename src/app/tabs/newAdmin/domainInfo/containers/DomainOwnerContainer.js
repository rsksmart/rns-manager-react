import { connect } from 'react-redux';
import { DomainOwnerComponent } from '../components';
import { reclaimDomain } from '../operations';
import { closeSetDomainOwner } from '../actions';

const mapStateToProps = state => ({
  domain: state.auth.name,
  isRegistryOwner: state.newAdmin.view.isRegistryOwner,
  registryOwner: state.newAdmin.view.registryOwner,
  checkingRegistryOwner: state.newAdmin.view.checkingRegistryOwner,
  isError: state.newAdmin.domainInfo.domainOwnerError !== '',
  errorMessage: state.newAdmin.domainInfo.domainOwnerError,
  isSettingDomainOwner: state.newAdmin.domainInfo.isSettingDomainOwner,
  advancedView: state.newAdmin.view.advancedView,
});

const mapDispatchToProps = dispatch => ({
  reclaimDomain: domain => dispatch(reclaimDomain(domain)),
  handleCloseClick: () => dispatch(closeSetDomainOwner())
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
)(DomainOwnerComponent);
