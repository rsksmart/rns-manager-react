import { connect } from 'react-redux';
import { AddressesComponent } from '../components';

const mapStateToProps = state => ({
  domain: state.auth.name,
  resolverName: state.newAdmin.resolver.resolverName,
  resolverAddress: state.newAdmin.resolver.resolverAddr,
  gettingResolver: state.newAdmin.resolver.gettingResolver,
  gettingContent: state.newAdmin.resolver.gettingContent,
});

const mergeProps = (stateProps, dispatchProps) => ({
  start: () => dispatchProps.start(stateProps.resolverAddress, stateProps.domain),
});

export default connect(
  mapStateToProps,
  null,
  mergeProps,
)(AddressesComponent);
