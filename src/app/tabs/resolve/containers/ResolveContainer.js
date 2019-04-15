import { connect } from 'react-redux';
import { ResolveComponent } from '../components';
import { resolveAddress } from '../operations';
import { parse } from 'query-string';
import { push } from 'connected-react-router';
import { toChecksumAddress } from '../../../selectors';

const mapStateToProps = state => ({
  name: parse(state.router.location.search).name || '',
  loading: state.resolve.loading,
  resolution: toChecksumAddress(state)(state.resolve.resolution),
  error: state.resolve.error
});

const mapDispatchToProps = dispatch => ({
  search: name =>  dispatch(push(`resolve?name=${name}`)),
  resolveAddress: name => dispatch(resolveAddress(name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResolveComponent);
