import { connect } from 'react-redux';
import AddressInputContainer from '../../../../components/AddressInputComponent';
import { setContent } from '../operations';
import { closeSetMessage } from '../actions';

const mapStateToProps = state => ({
  domain: state.auth.name,
  resolverAddress: state.newAdmin.resolver.resolverAddr,
  allowDelete: true,
  content: state.newAdmin.resolver.content,
});


const mapDispatchToProps = dispatch => ({
  setContentHash: (contentType, resolverAddress, domain, value) => dispatch(
    setContent(contentType, resolverAddress, domain, value),
  ),
  handleErrorClose: type => dispatch(closeSetMessage(type)),
  handleSuccessClose: type => dispatch(closeSetMessage(type)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  handleSubmit: value => dispatchProps.setContentHash(
    ownProps.contentType, stateProps.resolverAddress, stateProps.domain, value,
  ),
  handleDelete: () => dispatchProps.setContentHash(
    ownProps.contentType, stateProps.resolverAddress, stateProps.domain, '',
  ),
  handleErrorClose: () => dispatchProps.handleErrorClose(ownProps.contentType),
  handleSuccessClose: () => dispatchProps.handleSuccessClose(ownProps.contentType),
  reset: false,
  isSuccess: stateProps.content[ownProps.contentType].successTx !== '',
  successTx: stateProps.content[ownProps.contentType].successTx,
  isWaiting: stateProps.content[ownProps.contentType].isWaiting,
  isError: stateProps.content[ownProps.contentType].errorMessage !== '',
  strings: {
    ...ownProps.strings,
    error_message: stateProps.content[ownProps.contentType].errorMessage,
  },
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(AddressInputContainer);
