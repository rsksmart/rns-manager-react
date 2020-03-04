import { connect } from 'react-redux';
import { LeftNavComponent } from '../components';

const mapStateToProps = state => ({
  advancedView: state.newAdmin.advancedView,
  location: state.router.location.pathname,
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LeftNavComponent);
