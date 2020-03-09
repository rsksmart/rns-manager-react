import { connect } from 'react-redux';
import { RenewButtonComponent } from '../components';
import { toggleRenew } from '../actions';

const mapStateToProps = state => ({
  domain: state.auth.storageName,
  expires: state.newAdmin.renew.expires,
  isRenewOpen: state.newAdmin.renew.isRenewOpen,
  checkingExpirationTime: state.newAdmin.renew.checkingExpirationTime,
});

const mapDispatchToProps = dispatch => ({
  handleClick: isRenewOpen => dispatch(toggleRenew(isRenewOpen)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  handleClick: () => dispatchProps.handleClick(stateProps.isRenewOpen),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(RenewButtonComponent);
