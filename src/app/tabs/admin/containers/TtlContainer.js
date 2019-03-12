import { RegistryFieldComponent } from '../components';
import { connect } from 'react-redux';
import { parse } from 'query-string';
import { changeEditTtl } from '../actions';
import { getDomainTtl, setDomainTtl } from '../operations';

const mapStateToProps = state => ({
  domain: parse(state.router.location.search).domain,
  getting: state.admin.ttl.getting,
  value: state.admin.ttl.value,
  editOpen: state.admin.ttl.editOpen,
  editting: state.admin.ttl.editting,
  response: state.admin.ttl.response,
  hasError: state.admin.ttl.hasError
});

const mapDispatchToProps = dispatch => ({
  get: domain => dispatch(getDomainTtl(domain)),
  changeEdit: () => dispatch(changeEditTtl()),
  submit: (domain, ttl) => dispatch(setDomainTtl(domain, ttl))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistryFieldComponent);
