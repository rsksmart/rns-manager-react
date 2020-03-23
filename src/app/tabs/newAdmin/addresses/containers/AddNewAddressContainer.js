import { connect } from 'react-redux';
import { AddNewAddressContainer } from '../components';
import networks from '../networks.json';

import { setChainAddress } from '../operations';
import { closeSetChainAddress } from '../actions';

const availableNetworks = chainAddresses => networks.filter((network) => {
  //@todo: refactor this since they are all there!!
  // return networks;
  let include = true;
  Object.entries(chainAddresses).forEach((address) => {
    if (address[1] === '' || address[1] === '0x0000000000000000000000000000000000000000') {
      include = false;
    }
  });
  return include ? network : null;
});

const mapStateToProps = state => ({
  domain: state.auth.name,
  resolver: state.newAdmin.resolver.resolverAddr,
  networks: availableNetworks(state.newAdmin.addresses.chainAddresses),
  chainAddresses: state.newAdmin.addresses.chainAddresses,
  targetAddress: state.newAdmin.addresses.targetAddress,
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
