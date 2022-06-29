import { connect } from 'react-redux';
import { SearchTextRecordComponent } from '../components';
import { getContent } from '../../resolver/operations';
import { closeSetMessage } from '../../resolver/actions';
import { TEXT_RECORD } from '../../resolver/types';

const mapStateToProps = state => ({
  domain: state.auth.name,
  content: state.newAdmin.resolver.content,
  resolverAddress: state.newAdmin.resolver.resolverAddr,
});
const mapDispatchToProps = dispatch => ({
  handleClick: (resolverAddress, domain, data) => {
    dispatch(getContent(TEXT_RECORD, resolverAddress, domain, data));
  },
  handleCloseClick: () => dispatch(closeSetMessage(TEXT_RECORD)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  handleClick: data => dispatchProps.handleClick(
    stateProps.resolverAddress, stateProps.domain, { ...data },
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(SearchTextRecordComponent);
