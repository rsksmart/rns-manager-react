import { connect } from 'react-redux';
import { DomainOwnerComponent } from '../components';

const mapStateToProps = state => ({
  domain: state.auth.name,
  domainOwner: state.newAdmin.view.registryOwner,
  checkingRegistryOwner: state.newAdmin.view.checkingRegistryOwner,
});

export default connect(
  mapStateToProps,
)(DomainOwnerComponent);
