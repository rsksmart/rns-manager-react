import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { AutoLoginComponent } from '../components';
import { resetRegistrarState } from '../actions';

import { autoLogin } from '../../../auth/operations';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  handleManageClick: () => {
    dispatch(push('/admin'));
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
