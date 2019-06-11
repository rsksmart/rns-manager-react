import { connect } from 'react-redux';
import { ResolveAddrComponent } from '../components';
import { getName, getResolverAddress, getAddr } from '../selectors';
import { addr } from '../operations';

const mapStateToProps = state => ({
  name:  getName(state),
  resolverAddress: getResolverAddress(state),
  addr: getAddr(state)
});

const mapDispatchToProps = dispatch => ({
  getAddr: (resolverAddress, name) => dispatch(addr(resolverAddress, name))
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps.addr,
  getAddr: () => dispatchProps.getAddr(stateProps.resolverAddress, stateProps.name)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ResolveAddrComponent);
