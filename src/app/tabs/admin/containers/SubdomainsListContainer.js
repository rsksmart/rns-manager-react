import { SubdomainsListComponent } from '../components';
import { addSubdomain } from '../operations';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  domain: state.auth.name,
  subdomains: state.admin.subdomains.map(subdomain => subdomain.label)
});

const mapDispatchToProps = dispatch => ({
  onAddSubdomain: (domain, subdomain) => dispatch(addSubdomain(domain, subdomain))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubdomainsListComponent);
