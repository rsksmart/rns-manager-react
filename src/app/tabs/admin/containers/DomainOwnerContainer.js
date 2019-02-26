import { connect } from 'react-redux';
import { DomainOwnerComponent } from '../components';

const mapStateToProps = state => ({
  owner: state.admin.owner
})

export default connect(mapStateToProps)(DomainOwnerComponent);
