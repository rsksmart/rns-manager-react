import { connect } from 'react-redux';
import { AddressInputComponent } from '../../../../components';
import { setChainAddress, deleteChainAddress } from '../operations';
import { closeSetChainAddress } from '../actions';

const mapStateToProps = state => ({
  domain: state.auth.name,
  editDomain: state.newAdmin.subdomains.editDomain,
  editError: state.newAdmin.subdomains.editError,
});

const mapDispatchToProps = dispatch => ({
  handleSubmit: (domain, chainId, value) => dispatch(setChainAddress(domain, chainId, value)),
  handleDelete: (domain, chainId) => dispatch(deleteChainAddress(domain, chainId)),
  handleClose: chainName => dispatch(closeSetChainAddress(chainName)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  handleSubmit: value => dispatchProps.handleSubmit(stateProps.domain, ownProps.chainId, value),
  handleDelete: () => dispatchProps.handleDelete(stateProps.domain, ownProps.chainId),
  handleErrorClose: () => dispatchProps.handleClose(ownProps.label),
  handleSuccessClose: () => dispatchProps.handleClose(ownProps.label),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(AddressInputComponent);
