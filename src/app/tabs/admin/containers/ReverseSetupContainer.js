import { connect } from 'react-redux';
import { getReverseResolution, setReverseResolution } from '../operations';
import { ReverseSetupComponent } from '../components';

const mapStateToProps = state => ({
  address: state.auth.address,
  name: state.auth.name,
  ...state.admin.reverse,
});

const mapDispatchToProps = dispatch => ({
  getReverse: address => dispatch(getReverseResolution(address)),
  setReverse: name => dispatch(setReverseResolution(name)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  getReverse: () => dispatchProps.getReverse(stateProps.address),
  setReverse: () => dispatchProps.setReverse(stateProps.name),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ReverseSetupComponent);
