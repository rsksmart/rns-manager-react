import { connect } from 'react-redux';
import { DomainResolverComponent } from '../components';

const mapStateToProps = state => ({
  resolver: state.admin.resolver,
  resolverLoading: state.admin.resolverLoading
})

export default connect(mapStateToProps)(DomainResolverComponent);
