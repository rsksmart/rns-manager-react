import { connect } from 'react-redux';
import { ResolveAddressComponent } from '../components';
import { push } from 'connected-react-router';

const mapDispatchToProps = dispatch => ({
  onResolve: domain => dispatch(push(`/resolve?name=${domain}`))
});

export default connect(
  null,
  mapDispatchToProps
)(ResolveAddressComponent);
