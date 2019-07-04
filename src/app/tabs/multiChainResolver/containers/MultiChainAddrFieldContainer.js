import { connect } from 'react-redux';
import { parse } from 'query-string';
import { MultiChainAddrFieldComponent } from '../components';
import { chainAddr } from '../actions';
import { getChainAddr, setChainAddr } from '../operations';

const mapStateToProps = (state) => {
  const {
    getting, value, editOpen, editing,
  } = state.multiChainResolver.chainAddr;
  const { name } = state.auth;
  const { action, defaultValue } = parse(state.router.location.search);

  const preloadedValue = action === 'chain_addr' ? defaultValue : '';

  return {
    name,
    getting,
    value,
    editOpen,
    editing,
    preloadedValue,
  };
};

const mapDispatchToProps = dispatch => ({
  get: (name, chianId) => dispatch(getChainAddr(name, chianId)),
  changeEdit: () => dispatch(chainAddr.changeEdit()),
  set: (name, chainId, value) => dispatch(setChainAddr(name, chainId, value)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  get: chainId => dispatchProps.get(stateProps.name, chainId),
  set: (chainId, value) => dispatchProps.set(stateProps.name, chainId, value),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(MultiChainAddrFieldComponent);
