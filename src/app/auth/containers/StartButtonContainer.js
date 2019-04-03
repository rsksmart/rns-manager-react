import { StartButtonComponent } from '../components';
import { showModal } from '../actions';
import { connect } from 'react-redux';
import { start } from '../operations';

const mapStateToProps = state => ({
  isOwner: state.auth.isOwner,
  domain: state.auth.domain
});

const mapDispatchToProps = dispatch => ({
  open: () => {
    dispatch(showModal())
    dispatch(start())
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartButtonComponent);
