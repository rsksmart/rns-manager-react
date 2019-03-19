import { parse } from 'query-string';
import { connect } from 'react-redux';
import { UnsealComponent } from '../components';
import { unseal } from '../operations';

const mapStateToProps = state => ({
  domain: parse(state.router.location.search).domain
});

const mapDispatchToProps = dispatch => ({
  unseal: (domain, value) => dispatch(unseal(domain, value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnsealComponent);
