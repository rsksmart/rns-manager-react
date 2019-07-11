import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { StartButtonComponent } from '../components';
import { showModal } from '../actions';
import { start } from '../operations';
import { changeMyCryptoMetamask } from '../../tabs/user';

const mapStateToProps = state => ({
  address: state.auth.address,
  isOwner: state.auth.isOwner,
  domain: state.auth.name,
  viewMyCrypto: state.user.viewMyCrypto,
});

const mapDispatchToProps = dispatch => ({
  open: () => {
    dispatch(showModal());
    dispatch(start());
  },
  dontShowMyCrypto: () => dispatch(changeMyCryptoMetamask(false)),
  user: () => dispatch(push('/user')),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  open: !stateProps.viewMyCrypto ? dispatchProps.open : () => {
    dispatchProps.dontShowMyCrypto();
    dispatchProps.open();
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(StartButtonComponent);
