import { connect } from 'react-redux';
import { DomainComponent } from '../components';
import { getDomainOwner, getDomainResolver, getDomainTtl } from '../operations';
import { parse } from 'query-string';
import { push } from 'connected-react-router';

const mapStateToProps = state => ({
  domain: parse(state.router.location.search).domain
});

const mapDispatchToProps = dispatch => ({
  onDomainAdmin: (domain) => {
    dispatch(getDomainOwner(domain));
    dispatch(getDomainResolver(domain));
    dispatch(getDomainTtl(domain));
  },
  onSearch: (domain) => dispatch(push(`/admin?domain=${domain}`))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DomainComponent);
