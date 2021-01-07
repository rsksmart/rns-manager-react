import { connect } from 'react-redux';
import { DomainInfoComponent } from '../components';

const mapStateToProps = state => ({
  domain: state.auth.name,
  isSubdomain: state.newAdmin.view.isSubdomain,
  isTokenOwner: state.newAdmin.view.isTokenOwner,
  isRegistryOwner: state.newAdmin.view.isRegistryOwner,
  isTransferSuccess: state.newAdmin.domainInfo.isTransferSuccess,
  checkingRegistryOwner: state.newAdmin.view.checkingRegistryOwner,
  checkingOwnership: state.newAdmin.view.checkingRegistryOwner,
  isFifsMigrated: state.newAdmin.view.isFifsMigrated,
  isWalletConnect: state.auth.isWalletConnect,
});

export default connect(
  mapStateToProps,
)(DomainInfoComponent);
