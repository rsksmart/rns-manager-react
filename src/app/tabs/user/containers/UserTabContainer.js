import { UserTabComponent } from '../components';
import { connect } from 'react-redux';
import { networkSelector, toChecksumAddress } from '../../../selectors';
import { changeMyCryptoMetamask } from '../operations';

const mapStateToProps = state => ({
  name: state.auth.name,
  network: networkSelector(state.auth.network),
  address: state.auth.address && toChecksumAddress(state)(state.auth.address),
  viewMyCrypto: state.user.viewMyCrypto
});

const mapDispatchToProps = dispatch => ({
  changeMyCryptoMetamask: viewMyCrypto => dispatch(changeMyCryptoMetamask(viewMyCrypto))
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  changeMyCryptoMetamask: () => dispatchProps.changeMyCryptoMetamask(!stateProps.viewMyCrypto)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(UserTabComponent);
