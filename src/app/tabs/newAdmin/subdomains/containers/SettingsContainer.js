import { connect } from 'react-redux';
import SettingsComponent from '../components/SettingsComponent';
import { autoLogin } from '../../../../auth/operations';

const mapStateToProps = state => ({
  address: state.auth.address,
});

const mapDispatchToProps = dispatch => ({
  login: domain => dispatch(autoLogin(domain)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  login: () => dispatchProps.login(ownProps.domain),
});

export default connect(
  mapStateToProps, mapDispatchToProps, mergeProps,
)(SettingsComponent);
