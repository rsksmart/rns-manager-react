import { connect } from 'react-redux';
import { SearchBoxComponent } from '../components';
import getDomainState from '../../search/operations';

const mapDispatchToProps = dispatch => ({
  handleClick: domain => dispatch(getDomainState(domain)),
});

export default connect(
  null,
  mapDispatchToProps,
)(SearchBoxComponent);
