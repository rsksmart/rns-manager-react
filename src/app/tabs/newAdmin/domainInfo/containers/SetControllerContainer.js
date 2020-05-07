import { connect } from 'react-redux';
import { AddressInputComponent } from '../../../../components';
import { closeSetRegistryOwner } from '../actions';
import { setRegistryOwner } from '../operations';

const mapStateToProps = (state, ownProps) => ({
  allowDelete: false,
  allowRsk: true,
  label: state.auth.name,
  value: state.newAdmin.view.registryOwner,
  isRegistryOwner: state.newAdmin.view.isRegistryOwner,
  isError: state.newAdmin.domainInfo.registryOwnerError !== '',
  isWaiting: state.newAdmin.domainInfo.isSettingRegistryOwner,
  isSuccess: state.newAdmin.domainInfo.registryOwnerSuccessTx !== '',
  address: state.newAdmin.domainInfo.registryOwnerSuccessTx,
  strings: {
    ...ownProps.strings,
    error_message: state.newAdmin.domainInfo.registryOwnerError,
  },
  validationChainId: state.auth.network,
});

const mapDispatchToProps = dispatch => ({
  handleSubmit: (domain, value, currentValue) => dispatch(setRegistryOwner(
    domain, value.toLowerCase(), currentValue.toLowerCase(),
  )),
  handleClose: () => dispatch(closeSetRegistryOwner()),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  handleSubmit: value => dispatchProps.handleSubmit(stateProps.label, value, stateProps.value),
  handleErrorClose: () => dispatchProps.handleClose(),
  handleSuccessClose: () => dispatchProps.handleClose(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(AddressInputComponent);
