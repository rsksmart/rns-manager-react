import { ErrorStackComponent } from '../components';
import { connect } from 'react-redux';
import { removeTxError } from '../actions';

const mapStateToProps = state => ({
  errors: state.response.errors
});

const mapDispatchToProps = dispatch => ({
  removeError: errorId => dispatch(removeTxError(errorId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorStackComponent);
