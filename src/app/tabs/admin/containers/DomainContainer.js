import { connect } from 'react-redux';
import { DomainComponent } from '../components';
import { adminDomain, getDomainOwner, getDomainResolver, getDomainTTL } from '../operations';
import { parse } from 'query-string';

const mapStateToProps = state => ({
  domain: parse(state.router.location.search).domain
});

const mapDispatchToProps = dispatch => ({
  onDomainAdmin: (domain) => {
    dispatch(getDomainOwner(domain));
    dispatch(getDomainResolver(domain));
    dispatch(getDomainTTL(domain));
  },
  onSearch: (domain) => dispatch(adminDomain(domain))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DomainComponent);
