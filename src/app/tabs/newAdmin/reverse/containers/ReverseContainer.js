import { connect } from 'react-redux';
import { ReverseComponent } from '../components';

const mapStateToProps = state => ({
  reverseValue: state.newAdmin.reverse.value,
  address: state.auth.address,
  isRequesting: state.newAdmin.reverse.isRequesting,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReverseComponent);
