import { connect } from 'react-redux';
import { LinkToResolverComponent } from '../components';

const mapStateToProps = state => ({
  domain: state.auth.domain
});

export default connect(mapStateToProps)(LinkToResolverComponent);
