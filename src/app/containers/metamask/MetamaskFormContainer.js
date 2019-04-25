import { MetamaskFormComponent } from '../../components';
import { start } from '../../auth'
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  enabled: state.auth.address
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  startAndSubmit: () => dispatch(start(ownProps.onSubmit))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MetamaskFormComponent);
