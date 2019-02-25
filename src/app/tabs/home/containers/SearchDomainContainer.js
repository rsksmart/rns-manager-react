import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { SearchDomainComponent } from '../components';

const mapDispatchToProps = dispatch => ({
  onSearch: (domain) => dispatch(push(domain))
});

export default connect(
  null,
  mapDispatchToProps
)(SearchDomainComponent);
