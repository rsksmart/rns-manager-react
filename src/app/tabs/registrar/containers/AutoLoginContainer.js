import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { AutoLoginComponent } from '../components';
import { resetRegistrarState } from '../actions';

import { autoLogin } from '../../../auth/operations';

const mapStateToProps = state => ({
  successTx: state.registrar.successTx,
});

const mapDispatchToProps = dispatch => ({
  handleManageClick: () => {
    dispatch(push('/newAdmin'));
    dispatch(autoLogin(localStorage.getItem('name')));
    dispatch(resetRegistrarState());
  },
  handleRegisterNewClick: () => {
    dispatch(push('/'));
    dispatch(resetRegistrarState());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AutoLoginComponent);
