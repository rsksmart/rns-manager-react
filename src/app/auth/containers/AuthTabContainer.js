import { connect } from 'react-redux';
import { AuthTabComponent } from '../components';

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isOwner
});

export default connect(mapStateToProps)(AuthTabComponent);
