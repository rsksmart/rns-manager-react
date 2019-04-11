import { HeaderComponent } from '../components';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isOwner,
  domain: state.auth.domain
});

export default connect(mapStateToProps)(HeaderComponent);
