import { AdminTabComponent } from '../components';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  name: state.auth.name
});

export default connect(mapStateToProps)(AdminTabComponent);
