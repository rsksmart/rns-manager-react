import { FinalizeComponent } from '../components';
import { parse } from 'query-string';
import { connect } from 'react-redux';
import { finalize } from '../operations';

const mapStateToProps = state => ({
  domain: parse(state.router.location.search).domain
});

const mapDispatchToProps = dispatch => ({
  finalize: domain => dispatch(finalize(domain))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FinalizeComponent);
