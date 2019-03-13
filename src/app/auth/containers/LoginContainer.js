import { LoginComponent } from '../components';
import { connect } from 'react-redux';
import { requestEnable, receiveEnable, errorEnable, displayAuthModal } from '../actions';

const mapStateToProps = state => ({
  enabling: state.auth.enabling,
  address: state.auth.address,
  authenticating: state.auth.authenticating,
  domain: state.auth.domain,
});

const mapDispatchToProps = dispatch => ({
  enable: () => {
    dispatch(requestEnable);
    window.web3.currentProvider.enable()
      .catch(error => dispatch(errorEnable(error)))
      .then(result => {
        dispatch(receiveEnable(result));
        dispatch(displayAuthModal());
      });
  },
  openAuth: () => dispatch(displayAuthModal())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
