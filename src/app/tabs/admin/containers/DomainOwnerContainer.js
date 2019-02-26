import { connect } from 'react-redux';
import { DomainOwnerComponent } from '../components';

const mapStateToProps = state => ({
  owner: state.admin.owner,
  ownerLoading: state.admin.ownerLoading
})

export default connect(mapStateToProps)(DomainOwnerComponent);
