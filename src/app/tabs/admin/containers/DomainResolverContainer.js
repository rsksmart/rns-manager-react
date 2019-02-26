import { connect } from 'react-redux';
import { DomainResolverComponent } from '../components';

const mapStateToProps = state => ({
  resolver: state.admin.resolver
})

export default connect(mapStateToProps)(DomainResolverComponent);
