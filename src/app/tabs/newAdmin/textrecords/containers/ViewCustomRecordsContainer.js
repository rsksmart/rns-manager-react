import { connect } from 'react-redux';
import { ViewCustomRecordsComponent } from '../components';
import { getContent } from '../../resolver/operations';
import { closeSetMessage } from '../../resolver/actions';
import { TEXT_RECORD } from '../../resolver/types';

const mapStateToProps = state => ({
  domain: state.auth.name,
  resolverAddr: state.newAdmin.resolver.resolverAddr,
  content: Object.entries(state.newAdmin.resolver.content).filter(c => c[0] === TEXT_RECORD),
  gettingContent: state.newAdmin.resolver.gettingContent,
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
)(ViewCustomRecordsComponent);
