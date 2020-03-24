import { connect } from 'react-redux';
import { AddressesComponent } from '../components';

const mapStateToProps = state => ({
  domain: state.auth.name,
  resolverAddr: state.newAdmin.resolver.resolverAddr,
  gettingResolver: state.newAdmin.resolver.gettingResolver,
});

export default connect(
  mapStateToProps,
)(AddressesComponent);
