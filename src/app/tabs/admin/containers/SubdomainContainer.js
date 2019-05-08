import { SubdomainComponent } from '../components';
import { connect } from 'react-redux';
import { viewEditSubdomainOwner } from '../actions';
import { setSubdomainOwner } from '../operations';
import { toChecksumAddress } from '../../../selectors';

const mapStateToProps = (state, ownProps) => {
  const subdomain = state.admin.subdomains.find(subdomain => subdomain.label === ownProps.label);

  return {
    parent: state.auth.name,
    owner: subdomain.owner && toChecksumAddress(state)(subdomain.owner),
    viewEdit: subdomain.viewEdit,
    editting: subdomain.editting,
    response: subdomain.response,
    hasError: subdomain.hasError
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeEdit: () => dispatch(viewEditSubdomainOwner(ownProps.label)),
  set: (node, owner) => dispatch(setSubdomainOwner(node, ownProps.label, owner))
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  set: (owner) => dispatchProps.set(stateProps.parent, owner)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(SubdomainComponent);
