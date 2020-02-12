import { connect } from 'react-redux';
import { parse } from 'query-string';
import { CommitComponent } from '../components';
import { commit, checkIfAlreadyCommitted } from '../operations';
import { toggleSetupAddr } from '../actions';

const mapStateToProps = state => ({
  committing: state.registrar.committing,
  committed: state.registrar.committed,
  domain: parse(state.router.location.search).domain,
  hasBalance: state.registrar.hasBalance,
  setupAddr: state.registrar.setupAddr,
});

const mapDispatchToProps = dispatch => ({
  doCommitment: (domain, setupAddr) => dispatch(commit(domain, setupAddr)),
  // eslint-disable-next-line max-len
  checkIfAlreadyCommitted: (domain, setupAddr) => dispatch(checkIfAlreadyCommitted(domain, setupAddr)),
  toggleSetupAddr: setupAddr => dispatch(toggleSetupAddr(setupAddr)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  doCommitment: () => dispatchProps.doCommitment(stateProps.domain, stateProps.setupAddr),
  // eslint-disable-next-line max-len
  checkIfAlreadyCommitted: () => dispatchProps.checkIfAlreadyCommitted(stateProps.domain, stateProps.setupAddr),
  toggleSetupAddr: () => dispatchProps.toggleSetupAddr(stateProps.setupAddr),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(CommitComponent);
