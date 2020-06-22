import { connect } from 'react-redux';
import { AddressesComponent } from '../components';
import { supportedInterfaces } from '../../resolver/operations';

const mapStateToProps = state => ({
  domain: state.auth.name,
  resolverName: state.newAdmin.resolver.resolverName,
  resolverAddress: state.newAdmin.resolver.resolverAddr,
  gettingResolver: state.newAdmin.resolver.gettingResolver,
});

const mapDispatchToProps = dispatch => ({
  start: (resolverAddress, domain) => dispatch(supportedInterfaces(resolverAddress, domain)),
});

const mergeProps = (stateProps, dispatchProps) => ({
  start: () => dispatchProps.start(stateProps.resolverAddress, stateProps.domain),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(AddressesComponent);
