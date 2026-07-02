import React from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ResolveQRComponent } from '../components';
import { getSearch, getResolverAddress, getAddr } from '../selectors';
import { getAddress } from '../operations';

const mapStateToProps = (state, ownProps) => ({
  name: getSearch(ownProps.location),
  resolverAddress: getResolverAddress(state),
  addr: getAddr(state),
  supportedInterfaces: state.resolve.supportedInterfaces,
});

const mapDispatchToProps = dispatch => ({
  getAddress: (resolverAddress, supportedInterfaces, name) => dispatch(
    getAddress(resolverAddress, supportedInterfaces, name),
  ),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps.addr,
  getResolution: () => dispatchProps.getAddress(
    stateProps.resolverAddress, stateProps.supportedInterfaces, stateProps.name,
  ),
});

const ConnectedResolveQRComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ResolveQRComponent);

const ResolveAddrContainer = (props) => {
  const location = useLocation();
  return <ConnectedResolveQRComponent {...props} location={location} />;
};

export default ResolveAddrContainer;
