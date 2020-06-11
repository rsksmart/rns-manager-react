import { connect } from 'react-redux';
import { ResolveContentComponent } from '../components';

const mapStateToProps = state => ({
  content: state.resolve.content,
});

export default connect(mapStateToProps)(ResolveContentComponent);
