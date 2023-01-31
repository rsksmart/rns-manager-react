import { connect } from 'react-redux';
import { SearchBoxComponent } from '../components';
import getDomainState from '../../search/operations';

const mapDispatchToProps = dispatch => ({
  handleClick: (domain, partnerId) => dispatch(getDomainState(domain, partnerId)),
});

export default connect(
  null,
  mapDispatchToProps,
)(SearchBoxComponent);
