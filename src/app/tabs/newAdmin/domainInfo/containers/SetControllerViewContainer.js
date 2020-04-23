import { connect } from 'react-redux';
import { SetControllerViewComponent } from '../components';

const mapStateToProps = state => ({
  domain: state.auth.name,
  isRegistryOwner: state.newAdmin.view.isRegistryOwner,
  advancedView: state.newAdmin.view.advancedView,
});

export default connect(
  mapStateToProps,
  null,
)(SetControllerViewComponent);
