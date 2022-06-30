import { connect } from 'react-redux';
import DeleteValueForKeyComponent from '../components/DeleteValueForKeyComponent';
import { setContent } from '../../resolver/operations';
import { closeSetMessage } from '../../resolver/actions';
import { TEXT_RECORD } from '../../resolver/types';

const mapStateToProps = state => ({
  domain: state.auth.name,
  content: state.newAdmin.resolver.content,
  resolverAddress: state.newAdmin.resolver.resolverAddr,
});
const mapDispatchToProps = dispatch => ({
  handleSubmit: (resolverAddress, domain, data) => {
    dispatch(setContent(TEXT_RECORD, resolverAddress, domain, data));
  },
  handleCloseClick: () => dispatch(closeSetMessage(TEXT_RECORD)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  handleSubmit: data => dispatchProps.handleSubmit(
    stateProps.resolverAddress, stateProps.domain, { ...data },
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(DeleteValueForKeyComponent);
