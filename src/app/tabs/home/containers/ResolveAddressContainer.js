import { connect } from 'react-redux';
import { resolveAddress } from '../operations';
import { ResolveAddressComponent } from '../components';

const mapStateToProps = state => ({
  address: state.home.address,
  resolveAddressLoading: state.home.resolveAddressLoading
});

const mapDispatchToProps = dispatch => ({
  onResolve: (domain) => dispatch(resolveAddress(domain))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResolveAddressComponent);
