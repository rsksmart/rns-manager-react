import { connect } from 'react-redux';
import { LoginDropdownComponent } from '../components';

import { logOut } from '../auth/actions';
import { authenticate, logoutManager } from '../auth/operations';

const getStoredDomains = (address, current) => {
  if (!localStorage.getItem('storedDomains')) {
    return [];
  }

  const storedDomains = JSON.parse(localStorage.getItem('storedDomains'));
  if (!storedDomains[process.env.REACT_APP_ENVIRONMENT]) {
    return [];
  }

  return storedDomains[process.env.REACT_APP_ENVIRONMENT].filter(
    d => (d.owner === address && d.domain !== current),
  );
};

const mapStateToProps = state => ({
  name: state.auth.name,
  address: state.auth.address,
  isOwner: state.auth.isOwner,
  authError: state.auth.authError,
  previousDomains: getStoredDomains(state.auth.address, state.auth.name),
});

const mapDispatchToProps = dispatch => ({
  handleLogin: (domain, address) => dispatch(authenticate(domain, address)),
  handleSwitchLogin: (domain, address) => {
    console.log('handling the switch', domain, address);
    dispatch(logOut());
    dispatch(authenticate(domain, address));
  },
  handleLogOut: () => dispatch(logoutManager()),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  handleLogin: domain => dispatchProps.handleLogin(domain, stateProps.address),
  handleSwitchLogin: domain => dispatchProps.handleSwitchLogin(domain, stateProps.address),
  handleLogOut: () => dispatchProps.handleLogOut(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(LoginDropdownComponent);
