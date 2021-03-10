import { connect } from 'react-redux';
import { ViewRecordsComponent } from '../components';

const mapStateToProps = state => ({
  domain: state.auth.name,
  resolverAddr: state.newAdmin.resolver.resolverAddr,
  content: state.newAdmin.resolver.content,
  gettingContent: state.newAdmin.resolver.gettingContent,
});

export default connect(
  mapStateToProps,
)(ViewRecordsComponent);
