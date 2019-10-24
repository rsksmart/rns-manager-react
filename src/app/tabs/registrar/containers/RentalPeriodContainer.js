import { connect } from 'react-redux';
import { parse } from 'query-string';
import { RentalPeriodComponent } from '../components';
import getCost from '../operations';

const mapStateToProps = state => ({
  rifCost: state.registrar.rifCost,
  getting: state.registrar.gettingCost,
  domain: parse(state.router.location.search).domain,
});

const mapDispatchToProps = dispatch => ({
  getCost: (domain, duration) => dispatch(getCost(domain, duration)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  getCost: duration => dispatchProps.getCost(stateProps.domain, duration),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(RentalPeriodComponent);
