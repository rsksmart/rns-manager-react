import { connect } from 'react-redux';
import { SearchBoxComponent } from '../components';
import getDomainState from '../../search/operations';
import { setValidationMessage } from '../../search/actions';

const mapStateToProps = state => ({
  validationMessage: state.search.validationMessage,
  minLength: Number(state.search.minLength),
  maxLength: Number(state.search.maxLength),
});

const mapDispatchToProps = dispatch => ({
  handleClick: (domain) => {
    dispatch(setValidationMessage(''));
    dispatch(getDomainState(domain));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBoxComponent);
