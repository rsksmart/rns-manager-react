import { AuthTabComponent } from '../components';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isOwner
});

export default connect(mapStateToProps)(AuthTabComponent);
