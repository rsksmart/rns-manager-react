import { connect } from 'react-redux';
import { AutoLoginComponent } from '../components';
import { resetRegistrarState } from '../actions';
import { history } from '../../../../configureStore';

import { autoLogin } from '../../../auth/operations';

const mapStateToProps = state => ({
  successTx: state.registrar.successTx,
});

const mapDispatchToProps = dispatch => ({
  handleManageClick: () => {
    history.push('/newAdmin');
    dispatch(autoLogin(localStorage.getItem('name')));
    dispatch(resetRegistrarState());
  },
  handleRegisterNewClick: () => {
    history.push('/');
    dispatch(resetRegistrarState());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AutoLoginComponent);
