import { parse } from 'query-string';
import { connect } from 'react-redux';
import { LinkToResolverComponent } from '../components';

const mapStateToProps = state => ({
  domain: parse(state.router.location.search).domain
});

export default connect(mapStateToProps)(LinkToResolverComponent);
