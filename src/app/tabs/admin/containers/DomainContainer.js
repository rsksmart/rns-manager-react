import { connect } from 'react-redux';
import { DomainComponent } from '../components';
import { getDomainOwner, getDomainResolver, getDomainTTL } from '../operations';

const mapDispatchToProps = dispatch => ({
  onDomainAdmin: (domain) => {
    dispatch(getDomainOwner(domain));
    dispatch(getDomainResolver(domain));
    dispatch(getDomainTTL(domain));
  }
})

export default connect(
  null,
  mapDispatchToProps
)(DomainComponent);
