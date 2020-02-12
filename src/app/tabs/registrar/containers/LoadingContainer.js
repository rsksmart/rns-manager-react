import { connect } from 'react-redux';
import { LoadingComponent } from '../components';
import { checkCanReveal } from '../operations';

const mapStateToProps = state => ({
  waiting: state.registrar.waiting,
  hash: state.registrar.hash,
});

const mapDispatchToProps = dispatch => ({
  checkCanReveal: hashCommit => dispatch(checkCanReveal(hashCommit)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  checkCanReveal: () => dispatchProps.checkCanReveal(stateProps.hash),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(LoadingComponent);
