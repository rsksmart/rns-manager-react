import { connect } from 'react-redux';
import { parse } from 'query-string';
import { CommitComponent } from '../components';
import { commit, checkIfInProgress, hasEnoughRif } from '../operations';
import { toggleSetupAddr } from '../actions';

const mapStateToProps = state => ({
  committing: state.registrar.committing,
  committed: state.registrar.committed,
  domain: parse(state.router.location.search).domain,
  setupAddr: state.registrar.setupAddr,
  duration: state.registrar.duration,
  rifCost: state.registrar.rifCost,
});

const mapDispatchToProps = dispatch => ({
  doCommitment: (domain, duration, rifCost, setupAddr) => {
    let options = localStorage.getItem(`${domain}-options`);
    options = JSON.parse(options);
    const { salt } = options;
    if (salt) {
      dispatch(checkIfInProgress(domain));
    } else {
      dispatch(commit(domain, duration, rifCost, setupAddr));
    }
  },
  toggleSetupAddr: setupAddr => dispatch(toggleSetupAddr(setupAddr)),
  hasEnoughRif: cost => dispatch(hasEnoughRif(cost)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  doCommitment: () => dispatchProps.doCommitment(
    stateProps.domain,
    stateProps.duration,
    stateProps.rifCost,
    stateProps.setupAddr,
  ),
  toggleSetupAddr: () => dispatchProps.toggleSetupAddr(stateProps.setupAddr),
  checkBalance: () => dispatchProps.hasEnoughRif(stateProps.rifCost),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(CommitComponent);
