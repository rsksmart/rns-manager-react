import { connect } from 'react-redux';
import { parse } from 'query-string';
import { RevealComponent } from '../components';
import { commit } from '../operations';

const mapStateToProps = state => ({
  committing: state.registrar.committing,
  committed: state.registrar.committed,
  domain: parse(state.router.location.search).domain,
});

const mapDispatchToProps = dispatch => ({
  doCommitment: domain => dispatch(commit(domain)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  doCommitment: () => dispatchProps.doCommitment(stateProps.domain),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(RevealComponent);
