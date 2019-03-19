import { SubdomainsListComponent } from '../components';
import { addSubdomain } from '../operations';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  domain: state.auth.domain,
  subdomains: state.admin.subdomains
});

const mapDispatchToProps = dispatch => ({
  onAddSubdomain: (domain, subdomain) => dispatch(addSubdomain(domain, subdomain))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubdomainsListComponent);
