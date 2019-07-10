import { connect } from 'react-redux';
import { MetamaskFormComponent } from '../../components';
import { start } from '../../auth';

const mapStateToProps = state => ({
  enabled: state.auth.address,
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  startAndSubmit: () => dispatch(start(ownProps.onSubmit)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MetamaskFormComponent);
