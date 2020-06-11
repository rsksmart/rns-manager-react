import { connect } from 'react-redux';
import { ResolveContentComponent } from '../components';

const mapStateToProps = state => ({
  content: state.resolve.content,
});

const mapDispatchToProps = dispatch => ({

});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResolveContentComponent);
