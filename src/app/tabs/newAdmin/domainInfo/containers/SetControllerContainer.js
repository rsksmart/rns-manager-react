import { connect } from 'react-redux';
import { AddressInputComponent } from '../../../../components';
import { closeSetDomainOwner } from '../actions';
import { setDomainOwner } from '../operations';

const mapStateToProps = (state, ownProps) => ({
  allowDelete: false,
  label: state.auth.name,
  value: state.newAdmin.view.registryOwner,
  isError: state.newAdmin.domainInfo.domainOwnerError !== '',
  isWaiting: state.newAdmin.domainInfo.isSettingDomainOwner,
  isSuccess: state.newAdmin.domainInfo.domainOwnerSuccessTx !== '',
  address: state.newAdmin.domainInfo.domainOwnerSuccessTx,
  strings: {
    ...ownProps.strings,
    error_message: state.newAdmin.domainInfo.domainOwnerError,
  },
});

const mapDispatchToProps = dispatch => ({
  handleSubmit: (domain, value) => dispatch(setDomainOwner(domain, value.toLowerCase())),
  handleClose: () => dispatch(closeSetDomainOwner()),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  handleSubmit: value => dispatchProps.handleSubmit(stateProps.label, value),
  handleErrorClose: () => dispatchProps.handleClose(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(AddressInputComponent);
