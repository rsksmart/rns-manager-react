import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { ResolveComponent } from '../components';
import { identifyInterfaces } from '../operations';
import { getName, getResolve } from '../selectors';

const mapStateToProps = state => ({
  name: getName(state),
  ...getResolve(state),
});

const mapDispatchToProps = dispatch => ({
  search: name => dispatch(push(`resolve?name=${name}`)),
  resolve: name => dispatch(identifyInterfaces(name)),
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
