import { connect } from 'react-redux';
import { DomainInfoComponent } from '../components';

const mapStateToProps = state => ({
  domain: state.auth.name,
  isSubdomain: state.newAdmin.domainInfo.isSubdomain,
  isTransferSuccess: state.newAdmin.domainInfo.isTransferSuccess,
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DomainInfoComponent);
