import { AuthModalComponent } from '../components';
import { displayAuthModal } from '../auth/actions';
import { connect } from 'react-redux';
import { authenticate } from '../auth/operations';

const mapStateToProps = state => ({
  show: state.auth.displayAuthModal,
  authenticating: state.auth.authenticating,
  errorAuth: state.auth.errorAuth,
  address: state.auth.address
});

const mapDispatchToProps = dispatch => ({
  handleClose: () => dispatch(displayAuthModal()),
  authenticate: (domain, address) => dispatch(authenticate(domain, address))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthModalComponent);
