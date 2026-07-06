import React from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ResolveComponent } from '../components';
import { searchAddressOrDomain } from '../operations';
import { getSearch, getResolve } from '../selectors';
import { resetResolve } from '../actions';
import { history } from '../../../../configureStore';

const mapStateToProps = (state, ownProps) => ({
  name: getSearch(ownProps.location),
  ...getResolve(state),
});

const mapDispatchToProps = dispatch => ({
  search: name => history.push(`/resolve?name=${name}`),
  resolve: name => dispatch(searchAddressOrDomain(name.toLowerCase())),
  reset: () => dispatch(resetResolve()),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  resolve: () => dispatchProps.resolve(stateProps.name),
  reset: () => dispatchProps.reset(),
});

const ConnectedResolveComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ResolveComponent);

const ResolveContainer = (props) => {
  const location = useLocation();
  return <ConnectedResolveComponent {...props} location={location} />;
};

export default ResolveContainer;
