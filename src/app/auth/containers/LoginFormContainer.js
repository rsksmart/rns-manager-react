import { connect } from 'react-redux';
import LoginFormComponent from '../components/LoginFormComponent';

const mapStateToProps = state => ({
  domainInputInitialState: state.auth.authErrorDomain && state.auth.authErrorDomain.replace('.rsk', ''),
});

export default connect(mapStateToProps)(LoginFormComponent);
