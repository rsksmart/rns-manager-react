import { connect } from 'react-redux';
import { ViewRecordsComponent } from '../components';
import { supportedInterfaces } from '../operations';
import { closeMessage } from '../actions';

const mapStateToProps = state => ({
  domain: state.auth.name,
  resolverAddr: state.newAdmin.resolver.resolverAddr,
  content: state.newAdmin.resolver.content,
});

const mapDispatchToProps = dispatch => ({
  start: (resolverAddress, domain) => {
    dispatch(supportedInterfaces(resolverAddress, domain));
    dispatch(closeMessage());
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  start: () => dispatchProps.start(stateProps.resolverAddr, stateProps.domain),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ViewRecordsComponent);
