import { FinalizeComponent } from '../components';
import { parse } from 'query-string';
import { connect } from 'react-redux';
import { finalize } from '../operations';
import { mapMetamaskResponseTypeToBootstrapVariant } from '../../../selectors';

const mapStateToProps = state => ({
  domain: parse(state.router.location.search).domain,
  response: state.finalize.response ? {
    variant: mapMetamaskResponseTypeToBootstrapVariant(state.finalize.response.type),
    message: state.finalize.response.message
  } : null
});

const mapDispatchToProps = dispatch => ({
  finalize: domain => dispatch(finalize(domain))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FinalizeComponent);
