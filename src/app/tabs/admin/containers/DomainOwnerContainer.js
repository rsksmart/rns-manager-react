import { connect } from 'react-redux';
import { DomainOwnerComponent } from '../components';
import { viewEditOwner } from '../actions';
import { setDomainOwner } from '../operations';
import { parse } from 'query-string';

const mapStateToProps = state => ({
  domain: parse(state.router.location.search).domain,
  address: state.admin.owner.address,
  loading: state.admin.owner.loading,
  viewEdit: state.admin.owner.viewEdit
});

const mapDispatchToProps = dispatch => ({
  onViewEdit: () => dispatch(viewEditOwner()),
  onEditOwner: (domain, owner) => dispatch(setDomainOwner(domain, owner))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DomainOwnerComponent);
