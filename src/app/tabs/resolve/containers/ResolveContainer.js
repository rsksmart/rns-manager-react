import { connect } from 'react-redux';
import { ResolveComponent } from '../components';
import { resolveAddress, resolveChainAddr } from '../operations';
import { parse } from 'query-string';
import { push } from 'connected-react-router';
import { toChecksumAddress } from '../../../selectors';

const mapStateToProps = state => ({
  name: parse(state.router.location.search).name || '',
  loading: state.resolve.loading,
  resolution: toChecksumAddress(state)(state.resolve.resolution),
  resolver: state.resolve.resolver,
  error: state.resolve.error,
  supportsChainAddr: state.resolve.supportsChainAddr,
  chainAddrLoading: state.resolve.chainAddrLoading,
  chainAddrError: state.resolve.chainAddrError,
  chainAddrResolution: state.resolve.chainAddrResolution
});

const mapDispatchToProps = dispatch => ({
  search: name =>  dispatch(push(`resolve?name=${name}`)),
  resolveAddress: name => dispatch(resolveAddress(name)),
  resolveChainAddr: (resolverAddress, chainId, name) => dispatch(resolveChainAddr(resolverAddress, chainId, name))
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  resolveChainAddr: (chainId, name) => dispatchProps.resolveChainAddr(stateProps.resolver, chainId, name)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ResolveComponent);
