import React from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { parse } from 'query-string';
import { RentalPeriodComponent } from '../components';
import { getCost, getConversionRate } from '../operations';

const mapStateToProps = (state, ownProps) => ({
  rifCost: state.registrar.rifCost,
  getting: state.registrar.gettingCost,
  committing: state.registrar.committing,
  committed: state.registrar.committed,
  domain: parse(ownProps.location.search).domain || state.auth.name,
  gettingConversionRate: state.registrar.gettingConversionRate,
  conversionRate: state.registrar.conversionRate,
});

const mapDispatchToProps = dispatch => ({
  getCost: (domain, duration) => dispatch(getCost(domain, duration)),
  getConversionRate: rate => !rate && dispatch(getConversionRate()),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  getCost: duration => dispatchProps.getCost(stateProps.domain, duration),
  getConversionRate: () => dispatchProps.getConversionRate(stateProps.conversionRate),
});

const ConnectedRentalPeriodComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(RentalPeriodComponent);

const RentalPeriodContainer = (props) => {
  const location = useLocation();
  return <ConnectedRentalPeriodComponent {...props} location={location} />;
};

export default RentalPeriodContainer;
