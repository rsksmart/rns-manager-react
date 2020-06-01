import { connect } from 'react-redux';
import { ResolveQRComponent } from '../components';
import { getSearch, getResolverAddress, getAddr } from '../selectors';
import { getAddress } from '../operations';

const mapStateToProps = state => ({
  name: getSearch(state),
  resolverAddress: getResolverAddress(state),
  addr: getAddr(state),
  supportedInterfaces: state.resolve.supportedInterfaces,
});

const mapDispatchToProps = dispatch => ({
  getAddress: (resolverAddress, supportedInterfaces, name) => dispatch(
    getAddress(resolverAddress, supportedInterfaces, name),
  ),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps.addr,
  getResolution: () => dispatchProps.getAddress(
    stateProps.resolverAddress, stateProps.supportedInterfaces, stateProps.name,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ResolveQRComponent);
