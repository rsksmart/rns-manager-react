import { connect } from 'react-redux';

import { DisplayTextRecordComponent } from '../components';
import { setContent } from '../../resolver/operations';
import { closeSetMessage } from '../../resolver/actions';
import { TEXT_RECORD } from '../../resolver/types';

const mapStateToProps = state => ({
  domain: state.auth.name,
  resolverAddress: state.newAdmin.resolver.resolverAddr,
  isWaiting: state.newAdmin.resolver.content.TEXT_RECORD.isWaiting,
  errorMessage: state.newAdmin.resolver.content.TEXT_RECORD.errorMessage,
  successTx: state.newAdmin.resolver.content.TEXT_RECORD.successTx,
});

const mapDispatchToProps = dispatch => ({
  handleClick: (resolverAddress, domain, data) => {
    dispatch(setContent(TEXT_RECORD, resolverAddress, domain, data));
  },
  handleCloseClick: () => dispatch(closeSetMessage(TEXT_RECORD)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  handleClick: data => dispatchProps.handleClick(
    stateProps.resolverAddress, stateProps.domain, { ...data, isEditing: true },
  ),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(DisplayTextRecordComponent);
