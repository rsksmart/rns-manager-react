import { connect } from 'react-redux';
import { SubdomainListComponent } from '../components';

const mapStateToProps = state => ({
  domain: state.auth.name,
  subdomains: state.newAdmin.subdomains.subdomains,
  isEditing: state.newAdmin.subdomains.isEditing,
  editDomain: state.newAdmin.subdomains.editDomain,
  editError: state.newAdmin.subdomains.editError,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubdomainListComponent);
