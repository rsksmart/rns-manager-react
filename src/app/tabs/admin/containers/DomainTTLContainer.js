import { connect } from 'react-redux';
import { DomainTTLComponent } from '../components';

const mapStateToProps = state => ({
  ttl: state.admin.ttl,
  ttlLoading: state.admin.ttlLoading
})

export default connect(mapStateToProps)(DomainTTLComponent);
