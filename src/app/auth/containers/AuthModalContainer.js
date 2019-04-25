import { connect } from 'react-redux';
import { AuthModalComponent } from '../components';
import { closeModal } from '../actions';
import { authenticate } from '../operations';
import { networkSelector, toChecksumAddress } from '../../selectors';

const mapStateToProps = state => ({
  show: state.auth.showModal,
  hasMetamask: state.auth.hasMetamask,
  enabling: state.auth.enabling,
  enableError: state.auth.enableError,
  address: state.auth.address,
  displayAddress: state.auth.address && toChecksumAddress(state)(state.auth.address),
  network: networkSelector(state.auth.network),
  authError: state.auth.authError,
  name: state.auth.name,
  isOwner: state.auth.isOwner,
  defaultDomain: state.auth.defaultDomain
});

const mapDispatchToProps = dispatch => ({
  close: () => dispatch(closeModal()),
  authenticate: (name, address) => dispatch(authenticate(name, address))
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    authenticate: name => dispatchProps.authenticate(name, stateProps.address)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(AuthModalComponent);
