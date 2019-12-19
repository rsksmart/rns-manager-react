import { connect } from 'react-redux';
import { checkIfSubdomainOrTokenOwner, transferToken } from '../operations';
import { TransferDomainComponent } from '../components';

const mapStateToProps = state => ({
  name: state.auth.name,
  currentAddress: state.auth.address,
  ...state.admin.transferDomain,
});

const mapDispatchToProps = dispatch => ({
  checkIfSubdomainOrTokenOwner:
    (name, currentAddress) => dispatch(checkIfSubdomainOrTokenOwner(name, currentAddress)),
  transferToken: (
    name,
    addressToTransfer,
    currentAddress,
  ) => dispatch(transferToken(name, addressToTransfer, currentAddress)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  checkIfSubdomainOrTokenOwner:
    () => dispatchProps.checkIfSubdomainOrTokenOwner(stateProps.name, stateProps.currentAddress),
  transfer: addressToTransfer => dispatchProps.transferToken(
    stateProps.name,
    addressToTransfer,
    stateProps.currentAddress,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(TransferDomainComponent);
