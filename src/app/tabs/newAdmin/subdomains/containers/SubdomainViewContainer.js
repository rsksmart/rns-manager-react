import { connect } from 'react-redux';
import { AddressInputComponent } from '../../../../components';
import { setSubdomainOwner } from '../operations';
import { errorSetSubdomainOwner, successSetSubdomainOwnerClose } from '../actions';

const mapStateToProps = state => ({
  domain: state.auth.name,
  editDomain: state.newAdmin.subdomains.editDomain,
  editError: state.newAdmin.subdomains.editError,
});

const mapDispatchToProps = dispatch => ({
  handleSubmit: (domain, subdomain, newaddress, currentOwner) => dispatch(
    setSubdomainOwner(domain, subdomain, newaddress.toLowerCase(), currentOwner.toLowerCase()),
  ),
  handleErrorClose: subdomain => dispatch(errorSetSubdomainOwner(subdomain, '')),
  handleSuccessClose: subdomain => dispatch(successSetSubdomainOwnerClose(subdomain)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  handleSubmit: newAddress => dispatchProps.handleSubmit(
    stateProps.domain, ownProps.label, newAddress, ownProps.value,
  ),
  handleErrorClose: () => dispatchProps.handleErrorClose(ownProps.label),
  handleSuccessClose: () => dispatchProps.handleSuccessClose(ownProps.label),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(AddressInputComponent);

// 0xEe3D5f22Ea0FF393AeEf5Cf88a81E7d44979633B