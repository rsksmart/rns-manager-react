import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { ResolveAddressComponent } from '../components';

const mapDispatchToProps = dispatch => ({
  onResolve: domain => dispatch(push(`/resolve?name=${domain}`)),
});

export default connect(
  null,
  mapDispatchToProps,
)(ResolveAddressComponent);
