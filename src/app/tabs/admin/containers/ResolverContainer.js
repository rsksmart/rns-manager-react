import { RegistryFieldComponent } from '../components';
import { connect } from 'react-redux';
import { parse } from 'query-string';
import { changeEditResolver } from '../actions';
import { getDomainResolver, setDomainResolver } from '../operations';

const mapStateToProps = state => ({
  domain: parse(state.router.location.search).domain,
  getting: state.admin.resolver.getting,
  value: state.admin.resolver.value,
  editOpen: state.admin.resolver.editOpen,
  editting: state.admin.resolver.editting,
  response: state.admin.resolver.response,
  hasError: state.admin.resolver.hasError
});

const mapDispatchToProps = dispatch => ({
  get: domain => dispatch(getDomainResolver(domain)),
  changeEdit: () => dispatch(changeEditResolver()),
  submit: (domain, resolver) => dispatch(setDomainResolver(domain, resolver))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistryFieldComponent);
