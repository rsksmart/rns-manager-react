import { connect } from 'react-redux';
import { ResolveChainAddrComponent } from '../components';
import { getSearch, getChainAddr, getResolverAddress } from '../selectors';
import { getAddress } from '../operations';

const mapStateToProps = state => ({
  name: getSearch(state),
  resolverAddress: getResolverAddress(state),
  chainAddr: getChainAddr(state),
  supportedInterfaces: state.resolve.supportedInterfaces,
});

const mapDispatchToProps = dispatch => ({
  getChainAddr: (resolverAddress, supportedInterfaces, name, chainId) => {
    dispatch(getAddress(resolverAddress, supportedInterfaces, name, chainId));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps.chainAddr,
  getChainAddr: (chainId) => {
    dispatchProps.getChainAddr(
      stateProps.resolverAddress, stateProps.supportedInterfaces, stateProps.name, chainId,
    );
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ResolveChainAddrComponent);
