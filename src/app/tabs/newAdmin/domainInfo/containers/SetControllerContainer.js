import { connect } from 'react-redux';
import { AddressInputComponent } from '../../../../components';
import { closeSetDomainOwner } from '../actions';
import { setRegistryOwner } from '../operations';

const mapStateToProps = (state, ownProps) => ({
  allowDelete: false,
  label: state.auth.name,
  value: state.newAdmin.view.registryOwner,
  isRegistryOwner: state.newAdmin.view.isRegistryOwner,
  isError: state.newAdmin.domainInfo.registryOwnerError !== '',
  isWaiting: state.newAdmin.domainInfo.isSettingregistryOwner,
  isSuccess: state.newAdmin.domainInfo.registryOwnerSuccessTx !== '',
  address: state.newAdmin.domainInfo.registryOwnerSuccessTx,
  strings: {
    ...ownProps.strings,
    error_message: state.newAdmin.domainInfo.registryOwnerError,
  },
  validationChainId: state.auth.network,
});

const mapDispatchToProps = dispatch => ({
  handleSubmit: (domain, value) => dispatch(setRegistryOwner(domain, value.toLowerCase())),
  handleClose: () => dispatch(closeSetDomainOwner()),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  handleSubmit: value => dispatchProps.handleSubmit(stateProps.label, value),
  handleErrorClose: () => dispatchProps.handleClose(),
  handleSuccessClose: () => dispatchProps.handleClose(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(AddressInputComponent);
