import React from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { parse } from 'query-string';
import { LoadingComponent } from '../components';
import { checkCanReveal } from '../operations';

const mapStateToProps = (state, ownProps) => ({
  waiting: state.registrar.waiting,
  hash: state.registrar.hash,
  setupAddr: state.registrar.setupAddr,
  commitConfirmed: state.registrar.commitConfirmed,
  domain: parse(ownProps.location.search).domain,
});

const mapDispatchToProps = dispatch => ({
  checkCanReveal: (hashCommit, domain) => dispatch(checkCanReveal(hashCommit, domain)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  checkCanReveal: () => dispatchProps.checkCanReveal(stateProps.hash, stateProps.domain),
});

const ConnectedLoadingComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(LoadingComponent);

const LoadingContainer = (props) => {
  const location = useLocation();
  return <ConnectedLoadingComponent {...props} location={location} />;
};

export default LoadingContainer;
