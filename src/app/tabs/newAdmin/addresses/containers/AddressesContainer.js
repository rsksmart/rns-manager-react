import { connect } from 'react-redux';
import { AddressesComponent } from '../components';

const mapStateToProps = state => ({
  domain: state.auth.name,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddressesComponent);
