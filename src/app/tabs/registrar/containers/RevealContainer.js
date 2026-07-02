import React from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { parse } from 'query-string';
import { RevealComponent } from '../components';
import { revealCommit } from '../operations';

const mapStateToProps = (state, ownProps) => ({
  waiting: state.registrar.waiting,
  commitConfirmed: state.registrar.commitConfirmed,
  revealConfirmed: state.registrar.revealConfirmed,
  canReveal: state.registrar.canReveal,
  revealing: state.registrar.revealing,
  revealed: state.registrar.revealed,
  committed: state.registrar.committed,
  domain: parse(ownProps.location.search).domain,
  hash: state.registrar.hash,
  rifCost: state.registrar.rifCost,
  duration: state.registrar.duration,
  setupAddr: state.registrar.setupAddr,
});

const mapDispatchToProps = dispatch => ({
  revealCommit: domain => dispatch(revealCommit(domain)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  revealCommit: () => dispatchProps.revealCommit(stateProps.domain),
});

const ConnectedRevealComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(RevealComponent);

const RevealContainer = (props) => {
  const location = useLocation();
  return <ConnectedRevealComponent {...props} location={location} />;
};

export default RevealContainer;
