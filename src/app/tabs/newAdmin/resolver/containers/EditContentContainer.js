import { connect } from 'react-redux';
import AddressInputContainer from '../../../../components/AddressInputComponent';
import { setContent } from '../operations';
import { closeSetMessage } from '../actions';
import { CONTENT_BYTES, CONTENT_BYTES_BLANK } from '../types';

const mapStateToProps = state => ({
  domain: state.auth.name,
  resolverAddress: state.newAdmin.resolver.resolverAddr,
  allowDelete: true,
  isSuccess: state.newAdmin.resolver.content[CONTENT_BYTES].successTx !== '',
  successTx: state.newAdmin.resolver.content[CONTENT_BYTES].successTx,
  isWaiting: state.newAdmin.resolver.content[CONTENT_BYTES].isWaiting,
  isError: state.newAdmin.resolver.content[CONTENT_BYTES].errorMessage !== '',
  errorMessage: state.newAdmin.resolver.content[CONTENT_BYTES].errorMessage,
});


const mapDispatchToProps = dispatch => ({
  setContentHash: (resolverAddress, domain, value) => dispatch(
    setContent(CONTENT_BYTES, resolverAddress, domain, value),
  ),
  handleErrorClose: () => dispatch(closeSetMessage(CONTENT_BYTES)),
  handleSuccessClose: () => dispatch(closeSetMessage(CONTENT_BYTES)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  handleSubmit: value => dispatchProps.setContentHash(
    stateProps.resolverAddress, stateProps.domain, value,
  ),
  handleDelete: () => dispatchProps.setContentHash(
    stateProps.resolverAddress, stateProps.domain, CONTENT_BYTES_BLANK,
  ),
  reset: false,
  strings: {
    ...ownProps.strings,
    error_message: stateProps.errorMessage,
  },
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(AddressInputContainer);
