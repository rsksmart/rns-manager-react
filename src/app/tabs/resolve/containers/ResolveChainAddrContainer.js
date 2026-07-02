import React from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ResolveChainAddrComponent } from '../components';
import { getSearch, getChainAddr, getResolverAddress } from '../selectors';
import { getAddress } from '../operations';

const mapStateToProps = (state, ownProps) => ({
  name: getSearch(ownProps.location),
  resolverAddress: getResolverAddress(state),
  chainAddr: getChainAddr(state),
  supportedInterfaces: state.resolve.supportedInterfaces,
});

const mapDispatchToProps = dispatch => ({
  getChainAddr: (resolverAddress, supportedInterfaces, name, chainId) => {
    dispatch(getAddress(resolverAddress, supportedInterfaces, name, chainId));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps.chainAddr,
  getChainAddr: (chainId) => {
    dispatchProps.getChainAddr(
      stateProps.resolverAddress, stateProps.supportedInterfaces, stateProps.name, chainId,
    );
  },
});

const ConnectedResolveChainAddrComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ResolveChainAddrComponent);

const ResolveChainAddrContainer = (props) => {
  const location = useLocation();
  return <ConnectedResolveChainAddrComponent {...props} location={location} />;
};

export default ResolveChainAddrContainer;
