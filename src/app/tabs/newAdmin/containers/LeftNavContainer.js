import React from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { LeftNavComponent } from '../components';

const mapStateToProps = (state, ownProps) => ({
  advancedView: state.newAdmin.view.advancedView,
  location: ownProps.location.pathname,
  domain: state.auth.name,
});

const ConnectedLeftNavComponent = connect(
  mapStateToProps,
  null,
)(LeftNavComponent);

const LeftNavContainer = (props) => {
  const location = useLocation();
  return <ConnectedLeftNavComponent {...props} location={location} />;
};

export default LeftNavContainer;
