import React from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { parse } from 'query-string';
import { GetDomainStateComponent } from '../../../components';
import getAuctionState from '../operations';
import { history } from '../../../../configureStore';

const mapStateToProps = (state, ownProps) => ({
  domain: parse(ownProps.location.search).domain,
});

const mapDispatchToProps = dispatch => ({
  getDomainState: (domain) => {
    dispatch(getAuctionState(domain));
    history.push(`/search?domain=${domain}`);
  },
});

const ConnectedGetDomainStateComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GetDomainStateComponent);

const SearchDomainContainer = (props) => {
  const location = useLocation();
  return <ConnectedGetDomainStateComponent {...props} location={location} />;
};

export default SearchDomainContainer;
