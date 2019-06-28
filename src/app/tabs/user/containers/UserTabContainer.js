import { connect } from 'react-redux';
import { UserTabComponent } from '../components';
import { networkSelector, toChecksumAddress } from '../../../selectors';
import { changeMyCryptoMetamask } from '../operations';
import { logOut } from '../../../auth';

const mapStateToProps = state => ({
  name: state.auth.name,
  network: networkSelector(state.auth.network),
  address: state.auth.address && toChecksumAddress(state)(state.auth.address),
  viewMyCrypto: state.user.viewMyCrypto,
});

const mapDispatchToProps = dispatch => ({
  changeMyCryptoMetamask: viewMyCrypto => dispatch(changeMyCryptoMetamask(viewMyCrypto)),
  logOut: () => dispatch(logOut()),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  changeMyCryptoMetamask: () => dispatchProps.changeMyCryptoMetamask(!stateProps.viewMyCrypto),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(UserTabComponent);
