import { connect } from 'react-redux';
import { parse } from 'query-string';
import { CommitComponent } from '../components';
import { commit, checkIfAlreadyCommitted } from '../operations';

const mapStateToProps = state => ({
  committing: state.registrar.committing,
  committed: state.registrar.committed,
  domain: parse(state.router.location.search).domain,
  hasBalance: state.registrar.hasBalance,
});

const mapDispatchToProps = dispatch => ({
  doCommitment: domain => dispatch(commit(domain)),
  checkIfAlreadyCommitted: domain => dispatch(checkIfAlreadyCommitted(domain)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  doCommitment: () => dispatchProps.doCommitment(stateProps.domain),
  checkIfAlreadyCommitted: () => dispatchProps.checkIfAlreadyCommitted(stateProps.domain),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(CommitComponent);
