import { connect } from 'react-redux';
import { parse } from 'query-string';
import { RevealComponent } from '../components';
import { revealCommit, checkCanReveal } from '../operations';

const mapStateToProps = state => ({
  waiting: state.registrar.waiting,
  revealing: state.registrar.revealing,
  revealed: state.registrar.revealed,
  committed: state.registrar.committed,
  domain: parse(state.router.location.search).domain,
  hash: state.registrar.hash,
});

const mapDispatchToProps = dispatch => ({
  revealCommit: domain => dispatch(revealCommit(domain)),
  checkCanReveal: hashCommit => dispatch(checkCanReveal(hashCommit)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  revealCommit: () => dispatchProps.revealCommit(stateProps.domain),
  checkCanReveal: () => dispatchProps.checkCanReveal(stateProps.hash),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(RevealComponent);
