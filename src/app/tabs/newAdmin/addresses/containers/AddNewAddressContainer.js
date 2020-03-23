import { connect } from 'react-redux';
import { AddNewAddressContainer } from '../components';
import networks from '../networks.json';

import { setChainAddress } from '../operations';
import { closeSetChainAddress } from '../actions';

const availableNetworks = chainAddresses => networks.filter((network) => {
  // return networks;
  let include = true;
  Object.entries(chainAddresses).forEach((address) => {
    if (address[1].chainId === network.id) {
      include = false;
    }
  });
  return include ? network : null;
});

const mapStateToProps = state => ({
  domain: state.auth.name,
  resolver: state.newAdmin.resolver.resolverAddr,
  networks: availableNetworks(state.newAdmin.addresses.chainAddresses),
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
