import React from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { parse } from 'query-string';
import { GetDomainStateComponent } from '../components';
import { history } from '../../configureStore';

const mapStateToProps = (state, ownProps) => ({
  domain: parse(ownProps.location.search).domain,
  disableSearchButton: (state.registrar.committing || state.registrar.committed) && ownProps.location.pathname === '/registrar',
});

const mapDispatchToProps = () => ({
  getDomainState: domain => history.push(`/search?domain=${domain}`),
});

const ConnectedGetDomainStateComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GetDomainStateComponent);

const GetDomainStateContainer = (props) => {
  const location = useLocation();
  return <ConnectedGetDomainStateComponent {...props} location={location} />;
};

export default GetDomainStateContainer;
