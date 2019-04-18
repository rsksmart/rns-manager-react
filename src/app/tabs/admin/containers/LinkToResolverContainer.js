import { connect } from 'react-redux';
import { LinkToResolverComponent } from '../components';

const mapStateToProps = state => ({
  domain: state.auth.name
});

export default connect(mapStateToProps)(LinkToResolverComponent);
