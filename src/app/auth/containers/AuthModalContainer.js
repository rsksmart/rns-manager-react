import { connect } from 'react-redux';
import { AuthModalComponent } from '../components';
import { closeModal } from '../actions';
import { authenticate } from '../operations';
import { networkSelector } from '../selectors';
import { toChecksumAddress } from '../../selectors';

const mapStateToProps = state => ({
  show: state.auth.showModal,
  hasMetamask: state.auth.hasMetamask,
  enabling: state.auth.enabling,
  enableError: state.auth.enableError,
  address: state.auth.address,
  displayAddress: state.auth.address && toChecksumAddress(state)(state.auth.address),
  network: networkSelector(state.auth.network),
  authError: state.auth.authError,
  domain: state.auth.domain,
  isOwner: state.auth.isOwner,
  defaultDomain: state.auth.defaultDomain
});

const mapDispatchToProps = dispatch => ({
  close: () => dispatch(closeModal()),
  authenticate: (domain, address) => dispatch(authenticate(domain, address))
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    authenticate: domain => dispatchProps.authenticate(domain, stateProps.address)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(AuthModalComponent);
