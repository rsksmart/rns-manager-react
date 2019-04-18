import { RegistryFieldComponent } from '../components';
import { connect } from 'react-redux';
import { changeEditResolver } from '../actions';
import { getDomainResolver, setDomainResolver } from '../operations';
import { validateAddress } from '../../../validations';
import { toChecksumAddress } from '../../../selectors';

const mapStateToProps = state => ({
  domain: state.auth.name,
  getting: state.admin.resolver.getting,
  value: toChecksumAddress(state)(state.admin.resolver.value),
  editOpen: state.admin.resolver.editOpen,
  editting: state.admin.resolver.editting,
  validate: address => validateAddress(address, state.auth.network)
});

const mapDispatchToProps = dispatch => ({
  get: domain => dispatch(getDomainResolver(domain)),
  changeEdit: () => dispatch(changeEditResolver()),
  set: (domain, resolver) => dispatch(setDomainResolver(domain, resolver))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistryFieldComponent);
