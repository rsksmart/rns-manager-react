import { RegistryFieldComponent } from '../components';
import { connect } from 'react-redux';
import { parse } from 'query-string';
import { changeEditOwner } from '../actions';
import { getDomainOwner, setDomainOwner } from '../operations';

const mapStateToProps = state => ({
  domain: parse(state.router.location.search).domain,
  getting: state.admin.owner.getting,
  value: state.admin.owner.value,
  editOpen: state.admin.owner.editOpen,
  editting: state.admin.owner.editting
});

const mapDispatchToProps = dispatch => ({
  get: domain => dispatch(getDomainOwner(domain)),
  changeEdit: () => dispatch(changeEditOwner()),
  set: (domain, owner) => dispatch(setDomainOwner(domain, owner))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistryFieldComponent);
