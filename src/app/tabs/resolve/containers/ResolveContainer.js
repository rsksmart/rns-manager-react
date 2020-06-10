import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { ResolveComponent } from '../components';
import { searchAddressOrDomain } from '../operations';
import { getSearch, getResolve } from '../selectors';
import { resetResolve } from '../actions';

const mapStateToProps = state => ({
  name: getSearch(state),
  ...getResolve(state),
});

const mapDispatchToProps = dispatch => ({
  search: name => dispatch(push(`resolve?name=${name}`)),
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ResolveComponent);
