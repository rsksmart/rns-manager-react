import { connect } from 'react-redux';
import { DomainInfoComponent } from '../components';

const mapStateToProps = state => ({
  domain: state.auth.name,
  isSubdomain: state.newAdmin.view.isSubdomain,
  isTokenOwner: state.newAdmin.view.isTokenOwner,
  isTransferSuccess: state.newAdmin.domainInfo.isTransferSuccess,
  advancedView: state.newAdmin.view.advancedView,
  checkingRegistryOwner: state.newAdmin.view.checkingRegistryOwner,
});

export default connect(
  mapStateToProps,
)(DomainInfoComponent);
