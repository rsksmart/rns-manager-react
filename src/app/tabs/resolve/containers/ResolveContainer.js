import { connect } from 'react-redux';
import { ResolveComponent } from '../components';
import { resolveAddress } from '../operations';

const mapStateToProps = state => ({
  loading: state.resolve.loading,
  resolution: state.resolve.resolution,
  error: state.resolve.error
});

const mapDispatchToProps = dispatch => ({
  resolveAddress: name => dispatch(resolveAddress(name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResolveComponent);
