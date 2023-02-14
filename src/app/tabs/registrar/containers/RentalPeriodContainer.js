import { connect } from 'react-redux';
import { parse } from 'query-string';
import { RentalPeriodComponent } from '../components';
import { getCost, getConversionRate } from '../operations';

const mapStateToProps = state => ({
  rifCost: state.registrar.rifCost,
  getting: state.registrar.gettingCost,
  committing: state.registrar.committing,
  committed: state.registrar.committed,
  domain: parse(state.router.location.search).domain || state.auth.name,
  gettingConversionRate: state.registrar.gettingConversionRate,
  conversionRate: state.registrar.conversionRate,
  minDuration: Number(state.search.minDuration),
  maxDuration: Number(state.search.maxDuration),
});

const mapDispatchToProps = dispatch => ({
  getCost: (domain, duration) => {
    const searchParams = new URLSearchParams(document.location.search);
    const currentPartner = searchParams.get('partner') || 'default';
    dispatch(getCost(domain, duration, currentPartner));
  },
  getConversionRate: rate => !rate && dispatch(getConversionRate()),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  getCost: (duration) => {
    dispatchProps.getCost(stateProps.domain, duration);
  },
  getConversionRate: () => dispatchProps.getConversionRate(stateProps.conversionRate),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(RentalPeriodComponent);
