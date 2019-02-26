import { connect } from 'react-redux';
import { DomainComponent } from '../components';
import { getDomainOwner, getDomainResolver } from '../operations';

const mapDispatchToProps = dispatch => ({
  onDomainAdmin: (domain) => {
    dispatch(getDomainOwner(domain));
    dispatch(getDomainResolver(domain));
  }
})

export default connect(
  null,
  mapDispatchToProps
)(DomainComponent);
