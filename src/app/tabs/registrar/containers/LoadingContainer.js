import { connect } from 'react-redux';
import { LoadingComponent } from '../components';
import { checkCanReveal } from '../operations';

const mapStateToProps = state => ({
  waiting: state.registrar.waiting,
  hash: state.registrar.hash,
  setupAddr: state.registrar.setupAddr,
  commitConfirmed: state.registrar.commitConfirmed,
});

const mapDispatchToProps = dispatch => ({
  checkCanReveal: (hashCommit, setupAddr) => dispatch(checkCanReveal(hashCommit, setupAddr)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  checkCanReveal: () => dispatchProps.checkCanReveal(stateProps.hash, stateProps.setupAddr),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(LoadingComponent);
