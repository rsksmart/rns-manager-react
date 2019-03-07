import { PublicResolverFieldComponent } from '../components';
import { connect } from 'react-redux';
import { parse } from 'query-string';
import { getAddr } from '../operations';

const mapStateToProps = state => ({
  domain: parse(state.router.location.search).domain,
  getting: state.publicResolver.addr.getting,
  value: state.publicResolver.addr.value,
  error: state.publicResolver.addr.error
});

const mapDispatchToProps = dispatch => ({
  getValue: domain => dispatch(getAddr(domain))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PublicResolverFieldComponent);
