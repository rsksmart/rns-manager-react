import { SubdomainsListComponent } from '../components';
import { addSubdomain } from '../operations';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  domain: state.admin.domain,
  subdomains: state.admin.subdomains
});

const mapDispatchToProps = dispatch => ({
  onAddSubdomain: (subdomain) => dispatch(addSubdomain(subdomain))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubdomainsListComponent);
