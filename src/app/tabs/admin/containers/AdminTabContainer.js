import { AdminTabComponent } from '../components';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  name: state.auth.name,
  resolver: state.admin.resolver.value && state.admin.resolver.value.toLowerCase()
});

export default connect(mapStateToProps)(AdminTabComponent);
