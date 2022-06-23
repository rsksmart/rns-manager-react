import { connect } from 'react-redux';
import { NewRecordComponent } from '../components';
import { setContent } from '../../resolver/operations';
import { closeSetMessage } from '../../resolver/actions';
import { TEXT_RECORD } from '../../resolver/types';

const mapStateToProps = state => ({
  domain: state.auth.name,
  resolverAddress: state.newAdmin.resolver.resolverAddr,
  content: Object.entries(state.newAdmin.resolver.content).filter(c => c[0] === TEXT_RECORD),
});

const mapDispatchToProps = dispatch => ({
  handleSubmit: (type, resolverAddress, domain, value) => dispatch(
    setContent(type, resolverAddress, domain, value),
  ),
  handleCloseMessage: type => dispatch(closeSetMessage(type)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  handleSubmit: (type, value) => dispatchProps.handleSubmit(
    type, stateProps.resolverAddress, stateProps.domain, value,
  ),
  handleCloseMessage: type => dispatchProps.handleCloseMessage(type),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(NewRecordComponent);
