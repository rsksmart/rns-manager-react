import React from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ResolveQRComponent } from '../components';
import { getSearch, getResolverAddress, getName } from '../selectors';
import { name } from '../operations';

const mapStateToProps = (state, ownProps) => ({
  name: getSearch(ownProps.location),
  resolverAddress: getResolverAddress(state),
  nameResolution: getName(state),
});

const mapDispatchToProps = dispatch => ({
  getName: (resolverAddress, address) => dispatch(name(resolverAddress, address)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps.nameResolution,
  getResolution: () => dispatchProps.getName(stateProps.resolverAddress, stateProps.name),
});

const ConnectedResolveQRComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ResolveQRComponent);

const ResolveNameContainer = (props) => {
  const location = useLocation();
  return <ConnectedResolveQRComponent {...props} location={location} />;
};

export default ResolveNameContainer;
