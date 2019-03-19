import { RegistryFieldComponent } from '../components';
import { connect } from 'react-redux';
import { changeEditTtl } from '../actions';
import { getDomainTtl, setDomainTtl } from '../operations';

const mapStateToProps = state => ({
  domain: state.auth.domain,
  getting: state.admin.ttl.getting,
  value: state.admin.ttl.value,
  editOpen: state.admin.ttl.editOpen,
  editting: state.admin.ttl.editting
});

const mapDispatchToProps = dispatch => ({
  get: domain => dispatch(getDomainTtl(domain)),
  changeEdit: () => dispatch(changeEditTtl()),
  set: (domain, ttl) => dispatch(setDomainTtl(domain, ttl))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistryFieldComponent);
