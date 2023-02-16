import { connect } from 'react-redux';
import { SearchBoxComponent } from '../components';
import getDomainState from '../../search/operations';
import { setValidationMessage } from '../../search/actions';

const mapStateToProps = state => ({
  validationMessage: state.search.validationMessage,
});

const mapDispatchToProps = dispatch => ({
  handleClick: (domain) => {
    const searchParams = new URLSearchParams(document.location.search);
    const currentPartner = searchParams.get('partner') || 'default';

    dispatch(setValidationMessage(''));
    dispatch(getDomainState(domain, currentPartner));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBoxComponent);
