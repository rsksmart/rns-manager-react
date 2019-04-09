import { AuthTabComponent } from '../components';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  isLoggedIn: state.auth.domain !== null
});

export default connect(mapStateToProps)(AuthTabComponent);
