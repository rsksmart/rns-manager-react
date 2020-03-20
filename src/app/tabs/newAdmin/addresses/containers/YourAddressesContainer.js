import { connect } from 'react-redux';
import { YourAddressesComponent } from '../components';

const mapStateToProps = state => ({
  domain: state.auth.name,
  chainAddresses: state.newAdmin.addresses.chainAddresses,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(YourAddressesComponent);
