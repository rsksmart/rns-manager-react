import { connect } from 'react-redux';
import { HomeComponent } from '../components';
import { updatePartnerInState } from '../../registrar/operations';

const mapDispatchToProps = dispatch => ({
  updatePartner: id => dispatch(updatePartnerInState(id)),
});

export default connect(
  null,
  mapDispatchToProps,
)(HomeComponent);
