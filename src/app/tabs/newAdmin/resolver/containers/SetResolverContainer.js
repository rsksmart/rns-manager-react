import { connect } from 'react-redux';
import AddressInputContainer from '../../../../components/AddressInputComponent';

// eslint-disable-next-line no-unused-vars
const mapStateToProps = state => ({
  validation: false,
  validationChainId: state.auth.network,
  value: state.auth.resolverAddr,
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddressInputContainer);
