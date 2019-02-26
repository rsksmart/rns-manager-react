import { SubdomainsListComponent } from '../components';
import { addSubdomain } from '../operations';
import { connect } from 'react-redux';
import { parse } from 'query-string';

const mapStateToProps = state => ({
  domain: parse(state.router.location.search).domain,
  subdomains: state.admin.subdomains
});

const mapDispatchToProps = dispatch => ({
  onAddSubdomain: (domain, subdomain) => dispatch(addSubdomain(domain, subdomain))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubdomainsListComponent);
