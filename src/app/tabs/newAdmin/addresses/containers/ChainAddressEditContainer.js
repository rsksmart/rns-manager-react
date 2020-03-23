import { connect } from 'react-redux';
import { AddressInputComponent } from '../../../../components';

const mapStateToProps = state => ({
  domain: state.auth.name,
  editDomain: state.newAdmin.subdomains.editDomain,
  editError: state.newAdmin.subdomains.editError,
});

const mapDispatchToProps = dispatch => ({

});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(AddressInputComponent);
