import { SubdomainComponent } from '../components';
import { connect } from 'react-redux';
import { viewEditSubdomainOwner } from '../actions';
import { setSubdomainOwner } from '../operations';

const mapStateToProps = (state, ownProps) => {
  const subdomain = state.admin.subdomains.find(subdomain => subdomain.label === ownProps.label);

  return {
    viewEdit: subdomain.viewEdit,
    editting: subdomain.editting,
    response: subdomain.response,
    hasError: subdomain.hasError
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeViewEdit: () => dispatch(viewEditSubdomainOwner(ownProps.label)),
  submit: owner => dispatch(setSubdomainOwner(ownProps.parent, ownProps.label, owner))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubdomainComponent);
