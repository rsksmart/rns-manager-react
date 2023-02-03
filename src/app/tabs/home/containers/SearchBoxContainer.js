import { connect } from 'react-redux';
import { SearchBoxComponent } from '../components';
import getDomainState from '../../search/operations';

const mapDispatchToProps = dispatch => ({
  handleClick: (domain) => {
    const searchParams = new URLSearchParams(document.location.search);
    const currentPartner = searchParams.get('partner') || 'default';
    dispatch(getDomainState(domain, currentPartner));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(SearchBoxComponent);
