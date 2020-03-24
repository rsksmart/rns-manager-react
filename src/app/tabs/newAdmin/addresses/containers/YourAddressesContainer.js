import { connect } from 'react-redux';
import { YourAddressesComponent } from '../components';

const mapStateToProps = state => ({
  domain: state.auth.name,
  chainAddresses: state.newAdmin.addresses.chainAddresses,
});

export default connect(
  mapStateToProps,
)(YourAddressesComponent);
