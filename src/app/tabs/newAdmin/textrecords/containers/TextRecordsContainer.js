import { connect } from 'react-redux';
import { TextRecordsComponent } from '../components';

const mapStateToProps = state => ({
  gettingResolver: state.newAdmin.resolver.gettingResolver,
  resolverName: state.newAdmin.resolver.resolverName,
});

export default connect(
  mapStateToProps,
  null,
)(TextRecordsComponent);
