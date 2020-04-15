import { connect } from 'react-redux';
import AddressInputContainer from '../../../../components/AddressInputComponent';
import { setContent } from '../operations';
import { closeSetMessage } from '../actions';
import { CONTENT_HASH, CONTENT_HASH_BLANK } from '../types';

const mapStateToProps = state => ({
  domain: state.auth.name,
  resolverAddress: state.newAdmin.resolver.resolverAddr,
  allowDelete: true,
  isSuccess: state.newAdmin.resolver.content[CONTENT_HASH].successTx !== '',
  successTx: state.newAdmin.resolver.content[CONTENT_HASH].successTx,
  isWaiting: state.newAdmin.resolver.content[CONTENT_HASH].isWaiting,
  isError: state.newAdmin.resolver.content[CONTENT_HASH].errorMessage !== '',
  errorMessage: state.newAdmin.resolver.content[CONTENT_HASH].errorMessage,
});


const mapDispatchToProps = dispatch => ({
  setContentHash: (resolverAddress, domain, value) => dispatch(
    setContent(CONTENT_HASH, resolverAddress, domain, value),
  ),
  handleErrorClose: () => dispatch(closeSetMessage(CONTENT_HASH)),
  handleSuccessClose: () => dispatch(closeSetMessage(CONTENT_HASH)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  handleSubmit: value => dispatchProps.setContentHash(
    stateProps.resolverAddress, stateProps.domain, value,
  ),
  handleDelete: () => dispatchProps.setContentHash(
    stateProps.resolverAddress, stateProps.domain, CONTENT_HASH_BLANK,
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
