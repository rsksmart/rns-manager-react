import { connect } from 'react-redux';
import { AddressInputComponent } from '../../../components';
import { transferDomain } from '../operations';
import { handleErrorClose, handleSuccessClose } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  allowDelete: false,
  isWaiting: state.newAdmin.transfer.requestingTransfer,
  isError: state.newAdmin.transfer.isError,
  isSuccess: state.newAdmin.transfer.isSuccess,
  label: state.auth.name,
  currentAddress: state.auth.address,
  value: state.auth.address,
  strings: {
    ...ownProps.strings,
    error_message: state.newAdmin.transfer.errorMessage,
  },
});

const mapDispatchToProps = dispatch => ({
  handleSubmit: (
    domain, addressToTransfer, sender,
  ) => dispatch(transferDomain(domain, addressToTransfer, sender)),
  handleErrorClose: () => dispatch(handleErrorClose()),
  handleSuccessClose: () => dispatch(handleSuccessClose()),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  handleSubmit: addressToTransfer => dispatchProps.handleSubmit(
    stateProps.label,
    addressToTransfer.toLowerCase(),
    stateProps.currentAddress.toLowerCase(),
  ),
  handleErrorClose: () => dispatchProps.handleErrorClose(),
  handleSuccessClose: () => dispatchProps.handleSuccessClose(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(AddressInputComponent);
