import { connect } from 'react-redux';
import { AddNewAddressContainer } from '../components';
import networks from '../networks.json';

import { setChainAddress } from '../operations';
import { closeSetChainAddress } from '../actions';

const mapStateToProps = state => ({
  domain: state.auth.name,
  resolver: state.newAdmin.resolver.resolverAddr,
  networks,
  isEditing: state.newAdmin.addresses.setIsEditing,
  isWaiting: state.newAdmin.addresses.setIsWaiting,
  isSuccess: state.newAdmin.addresses.setIsSuccess,
  isError: state.newAdmin.addresses.setIsError,
  successTx: state.newAdmin.addresses.setSuccessTx,
  errorMessage: state.newAdmin.addresses.setError,
});

const mapDispatchToProps = dispatch => ({
  handleClick: (domain, networkId, address) => dispatch(
    setChainAddress(domain, networkId, address),
  ),
  handleMessageClose: () => dispatch(closeSetChainAddress()),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  handleClick: (networkId, address) => dispatchProps.handleClick(
    stateProps.domain, networkId, address,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(AddNewAddressContainer);
