import { connect } from 'react-redux';
import { ResolveComponent } from '../components';
import { resolveAddress } from '../operations';
import { parse } from 'query-string';
import { push } from 'connected-react-router';

const mapStateToProps = state => ({
  name: parse(state.router.location.search).name,
  loading: state.resolve.loading,
  resolution: state.resolve.resolution,
  error: state.resolve.error
});

const mapDispatchToProps = dispatch => ({
  resolveAddress: name => {
    if (name) dispatch(push(`resolve?name=${name}`));
    dispatch(resolveAddress(name));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResolveComponent);
