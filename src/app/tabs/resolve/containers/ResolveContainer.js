import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { ResolveComponent } from '../components';
import { searchAddressOrDomain } from '../operations';
import { getSearch, getResolve } from '../selectors';

const mapStateToProps = state => ({
  name: getSearch(state),
  ...getResolve(state),
});

const mapDispatchToProps = dispatch => ({
  search: name => dispatch(push(`resolve?name=${name}`)),
  resolve: name => dispatch(searchAddressOrDomain(name.toLowerCase())),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  resolve: () => dispatchProps.resolve(stateProps.name),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ResolveComponent);
