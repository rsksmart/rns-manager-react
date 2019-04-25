import { connect } from 'react-redux';
import { StartButtonComponent } from '../components';
import { showModal } from '../actions';
import { start } from '../operations';
import { push } from 'connected-react-router';

const mapStateToProps = state => ({
  address: state.auth.address,
  isOwner: state.auth.isOwner,
  domain: state.auth.name
});

const mapDispatchToProps = dispatch => ({
  open: () => {
    dispatch(showModal())
    dispatch(start())
  },
  user: () => dispatch(push('/user'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartButtonComponent);
