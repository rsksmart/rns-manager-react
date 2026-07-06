import React from 'react';
import { parse } from 'query-string';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RegistrarComponent } from '../components';
import getDomainState from '../../search/operations';
import { checkIfInProgress } from '../operations';
import { closeErrorMessage } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  domain: parse(ownProps.location.search).domain,
  domainStateLoading: state.search.domainStateLoading,
  owned: state.search.owned,
  owner: state.search.owner,
  walletAddress: state.auth.address,
  blocked: state.search.blocked,
  requestingOwner: state.search.requestingOwner,
  committed: state.registrar.committed,
  waiting: state.registrar.waiting,
  canReveal: state.registrar.canReveal,
  revealConfirmed: state.registrar.revealConfirmed,
  errorMessage: state.registrar.errorMessage,
  language: state.multilanguage.currentLanguageCode,
});

const mapDispatchToProps = dispatch => ({
  getState: domain => dispatch(getDomainState(domain)),
  checkIfAlreadyRegistered: domain => dispatch(checkIfInProgress(domain)),
  handleCloseClick: () => dispatch(closeErrorMessage()),
});

const ConnectedRegistrarComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegistrarComponent);

const RegistrarContainer = (props) => {
  const location = useLocation();
  return <ConnectedRegistrarComponent {...props} location={location} />;
};

export default RegistrarContainer;
