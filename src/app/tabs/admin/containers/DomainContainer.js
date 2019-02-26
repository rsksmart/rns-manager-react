import { connect } from 'react-redux';
import { DomainComponent } from '../components';
import { getDomainOwner } from '../operations';

const mapDispatchToProps = dispatch => ({
  onDomainAdmin: (domain) => dispatch(getDomainOwner(domain))
})

export default connect(
  null,
  mapDispatchToProps
)(DomainComponent);
