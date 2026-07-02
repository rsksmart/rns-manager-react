import React from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { parse } from 'query-string';
import { DomainStateComponent } from '../components';
import getDomainState from '../operations';
import { resetRegistrarState } from '../../registrar/actions';
import { checkBrowserNotifications } from '../../../browerNotifications/operations';
import { history } from '../../../../configureStore';

const mapStateToProps = (state, ownProps) => ({
  domain: parse(ownProps.location.search).domain || '',
  domainStateLoading: state.search.domainStateLoading,
  owned: state.search.owned,
  owner: state.search.owner,
  blocked: state.search.blocked,
  requestingOwner: state.search.requestingOwner,
  requestingCost: state.search.requestingCost,
  rifCost: state.search.rifCost,
});

const mapDispatchToProps = dispatch => ({
  getState: domain => dispatch(getDomainState(domain)),
  search: domain => history.push(`/search?domain=${domain}`),
  registerDomain: (domain) => {
    dispatch(resetRegistrarState());
    history.push(`/registrar?domain=${domain}`);
    dispatch(checkBrowserNotifications());
  },
});

const ConnectedDomainStateComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DomainStateComponent);

const DomainStateContainer = (props) => {
  const location = useLocation();
  return <ConnectedDomainStateComponent {...props} location={location} />;
};

export default DomainStateContainer;
