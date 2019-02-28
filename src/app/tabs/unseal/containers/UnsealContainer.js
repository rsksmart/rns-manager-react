import { parse } from 'query-string';
import { connect } from 'react-redux';
import { UnsealComponent } from '../components';
import { mapMetamaskResponseTypeToBootstrapVariant } from '../../../selectors';
import { unseal } from '../operations';

const mapStateToProps = state => ({
  domain: parse(state.router.location.search).domain,
  response: state.unseal.response ? {
    variant: mapMetamaskResponseTypeToBootstrapVariant(state.unseal.response.type),
    message: state.unseal.response.message
  } : null
});

const mapDispatchToProps = dispatch => ({
  unseal: (domain, value) => dispatch(unseal(domain, value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnsealComponent);
