import { ErrorStackComponent } from '../components';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  errors: state.response.errors
});

export default connect(mapStateToProps)(ErrorStackComponent);
