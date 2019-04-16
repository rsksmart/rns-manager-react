import { AuthModalComponent } from '../components';
import { closeModal } from '../actions';
import { authenticate } from '../operations';
import { connect } from 'react-redux';
import { networkSelector } from '../selectors';
import { toChecksumAddress } from '../../selectors';

const mapStateToProps = state => ({
  show: state.auth.showModal,
  hasMetamask: state.auth.hasMetamask,
  enabling: state.auth.enabling,
  enableError: state.auth.enableError,
  address: state.auth.address && toChecksumAddress(state)(state.auth.address),
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthModalComponent);
