import { MultiChainAddrFieldComponent } from '../components';
import { connect } from 'react-redux';
import { chainAddr } from '../actions';
import { getChainAddr, setChainAddr } from '../operations';

const mapStateToProps = state  => {
  const { getting, value, editOpen, editting } = state.multiChainResolver.chainAddr;
  const { name } = state.auth;

  return {
    name,
    getting,
    value,
    editOpen,
    editting
  };
};

const mapDispatchToProps = dispatch => {
  return {
    get: (name, chianId) => dispatch(getChainAddr(name, chianId)),
    changeEdit: () => dispatch(chainAddr.changeEdit()),
    set: (name, chainId, value) => dispatch(setChainAddr(name, chainId, value))
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    get: chainId => dispatchProps.get(stateProps.name, chainId),
    set: (chainId, value) => dispatchProps.set(stateProps.name, chainId, value)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(MultiChainAddrFieldComponent);
