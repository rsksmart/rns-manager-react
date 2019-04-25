import { MetamaskButtonComponent } from '../../components';
import { start } from '../../auth'
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  enabled: state.auth.address
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  startAndClick: () => dispatch(start(ownProps.onClick))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MetamaskButtonComponent);
